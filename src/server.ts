import express from 'express';
import router from './routes';
import Database from './database';

export default class Server {
    // Application express
    private app: express.Application;

    // Port HTTP (par défaut: 3000)
    private readonly port: number;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
    }

    /**
     * Lance le server
     * @return void
     */
    public start(): void {
        // Connexion à la base de données
        Database.instance.connection;

        // Parser
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // Routes
        this.app.use('/api', router);

        // Lancement du server
        this.app.listen(this.port, () => console.log(`Server started at ${this.port}.`));
    }
}