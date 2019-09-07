import express from 'express';
import router from './routes';

export default class Server {
    static start(port: number): void {
        const app = express();

        // Routes
        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}