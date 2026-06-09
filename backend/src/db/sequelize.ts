import { Sequelize } from "sequelize-typescript";
import config from 'config'
import dotenv from 'dotenv'
import Group from '../models/Group'
import Meeting from '../models/Meeting'

dotenv.config()

const cfg = config.get('db') as Record<string, any>

// allow overriding via environment variables (e.g., backend/.env)
const dbConfig = {
    host: process.env.DB_HOST || cfg.host,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : cfg.port,
    username: process.env.DB_USER || cfg.username,
    password: process.env.DB_PASS !== undefined ? process.env.DB_PASS : cfg.password,
    database: process.env.DB_NAME || cfg.database
}

// validate required keys to avoid silent fallbacks
const required = ['host','port','username','database']
for (const k of required) {
    if (!dbConfig[k] && dbConfig[k] !== 0) {
        throw new Error(`Missing required DB config key: ${k}`)
    }
}

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [Group, Meeting],
    logging: console.log,
    host: dbConfig.host,
    port: Number(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password || '',
    database: dbConfig.database
})

console.log(`connected to database on `, dbConfig)

export default sequelize