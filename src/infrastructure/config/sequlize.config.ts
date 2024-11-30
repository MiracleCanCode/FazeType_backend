import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

export const sequlize = new Sequelize(process.env.DATABASE_URL)
