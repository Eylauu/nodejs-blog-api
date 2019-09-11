import express from 'express';
import router from './routes';
import Database from './database';
import bodyParser from 'body-parser';

export default class Server {
    static start(port: number): void {
        const app = express();

        // Connexion à la base de données
        Database.instance.connection;

        // Body Parser
        app.use(bodyParser.json());

        // Routes
        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}