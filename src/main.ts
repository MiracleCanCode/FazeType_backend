import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { sequlize } from './infrastructure/config/sequlize.config'
import { Logger } from './domain/services/logger.service'

dotenv.config()

async function bootstrap() {
    const logger = new Logger()
    const PORT = process.env.PORT ?? 3000
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    })
    app.useLogger(app.get(Logger))
    try {
        await app.listen(PORT)
        await sequlize.authenticate()
        logger.log(`Server started on http://localhost:${PORT}`)
    } catch (err) {
        logger.error(`Error! Error message: ${err}`)
        await sequlize.close()
    }

    process.on('SIGINT', async () => {
        await sequlize.close()
        logger.log('Server end')
    })
}

bootstrap()
