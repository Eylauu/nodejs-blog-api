import mongoose, { Mongoose } from 'mongoose';
import { MongoError } from 'mongodb';

import "dotenv/config";

export default class Database {
    private static _instance: Database | undefined;
    private _connection: Promise<Mongoose> | undefined;

    private readonly db_host: string | undefined = process.env.DATABASE_HOST;
    private readonly db_port: string | undefined = process.env.DATABASE_PORT;
    private readonly db_user: string | undefined = process.env.DATABASE_USER;
    private readonly db_password: string | undefined = process.env.DATABASE_PASSWORD;
    private readonly db_name: string | undefined = process.env.DATABASE_NAME;

    /**
     * Renvoie une instance de la classe courante (Pattern Singleton)
     * @return Database
     */
    public static get instance(): Database {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }

    /**
     * Renvoie une connexion à la base de données MongoDB
     * @return Promise<Mongoose>
     */
    public get connection(): Promise<Mongoose> {
        if (!this._connection) {
            const dbUrl = `mongodb://${this.db_user}:${this.db_password}@${this.db_host}:${this.db_port}/${this.db_name}`;
            this._connection = mongoose.connect(dbUrl, { useNewUrlParser: true }, (error: MongoError) => {
                if (error) {
                    console.log(`DATABASE ERROR: ${error}`);
                } else {
                    console.log('Database connected.')
                }
            });
        }
        return this._connection;
    }
}