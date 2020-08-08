
import mysql from 'mysql2';

export class Database {
    public static connection: mysql.Pool;
    constructor() { }

    public static initialise() {
        this.connection = mysql.createPool({
            connectionLimit: 12,
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: eval(process.env.DB_PORT),
            database: process.env.DATABASE,
            charset: 'utf8',
            multipleStatements: true,
            insecureAuth: true
        });
    }

    public static async runQuery(query: string, parameters?: string[]): Promise<any> {
        return await new Promise((resolve, reject) => {
            this.connection.getConnection((connectionError, connection) => {
                (connectionError) ? reject(connectionError) : connection.query(query, parameters, (queryError, result) => {
                    (queryError) ? reject(queryError) : resolve(result);
                    connection.release();
                });
            });
        });
    }
}