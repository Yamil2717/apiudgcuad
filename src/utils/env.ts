import dotenv from 'dotenv';

dotenv.config();

type envInterface = {
    db: {
        host: any,
        user: any,
        type: any,
        password: any,
        port: number,
        nameDB: any
    },
    api: {
        port: number,
        accessSecret: string,
        refreshSecret: string,
        adminEmail: string,
        cookieDomain: string,
        urlAPI: string,
    }
}

const env: envInterface = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        type: process.env.DB_DIALECT,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        nameDB: process.env.DB_NAME
    },
    api: {
        port: Number(process.env.PORT),
        accessSecret: process.env.SECRET_ACCESS_KEY || '',
        refreshSecret: process.env.SECRET_REFRESH_KEY || '',
        cookieDomain: process.env.COOKIE_DOMAIN || '',
        adminEmail: process.env.ADMIN_EMAIL || '',
        urlAPI: process.env.URL_API || ''
    }
}

export default env;