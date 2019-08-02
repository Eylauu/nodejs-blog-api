import express from 'express';

export default class Server {
    static start(port: number) {
        const app = express();
        
        app.get('/', (req, res) => {
            res.json({ message: "Hello world!" });
        })

        app.listen(port, () => {
            console.log(`Server started at ${port}.`);
        });
    }
}