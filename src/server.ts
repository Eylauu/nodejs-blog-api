import express from 'express';
import router from './routes';
import Database from './database';

export default class Server {
    static start(port: number): void {
        const app = express();

        // Connexion à la base de données
        Database.instance.connection;

        // Routes
        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}