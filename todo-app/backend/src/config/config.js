import dotenv from 'dotenv'

dotenv.config()

export default ENV = {
    db_user = process.env.DB_USER || 'postgres',
    db_pass = process.env.DB_PASS || 'postgres',
    db_host = process.env.DB_HOST || 'postgres',
    db_port = process.env.DB_PORT || '5432',
    db_database = process.env.DB_DATABASE || 'postgres',
}