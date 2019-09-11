import mongoose, { Mongoose } from 'mongoose';
import { MongoError } from 'mongodb';

export default class Database {
    private static _instance: Database | undefined;
    private _connection: Promise<Mongoose> | undefined;

    private readonly db_host: string = "localhost";
    private readonly db_port: string = "27017";
    private readonly db_name: string = "blog_api";
    private readonly db_user: string = "";
    private readonly db_password: string = "";

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
            const db = `mongodb://${this.db_user}:${this.db_password}@${this.db_host}:${this.db_port}/${this.db_name}`;
            this._connection = mongoose.connect(db, { useNewUrlParser: true }, (error: MongoError) => {
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