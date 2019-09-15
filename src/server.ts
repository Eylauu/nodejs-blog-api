import express from 'express';
import router from './routes';
import Database from './database';

export default class Server {
    /**
     * Lance le server
     * @return void
     */
    static start(port: number): void {
        const app = express();

        // Connexion à la base de données
        Database.instance.connection;

        // Parser
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // Routes
        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}