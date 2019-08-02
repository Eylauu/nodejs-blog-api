import express from 'express';
import router from './routes';

export default class Server {
    static start(port: number) {
        const app = express();
        
        // Routes
        app.use(router);

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}