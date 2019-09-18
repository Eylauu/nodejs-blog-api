import { Request, Response, NextFunction } from 'express';
import { User, UserInterface } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import 'dotenv/config';
import * as mongoose from 'mongoose';

export default class JwtController {
    private static readonly jwt_passphrase: string | undefined = process.env.JWT_PASSPHRASE;

    /**
     * Authentifie un utilisateur
     * @param req 
     * @param res 
     */
    public static authenticate(req: Request, res: Response): void {
        User.findOne({ email: req.body.email })
            .then((user: mongoose.Document | null) => {
                const userI = <UserInterface>user;
                if (userI) {
                    bcrypt.compare(req.body.password, userI.password)
                        .then((isValid: boolean) => {
                            if (isValid) {
                                jwt.sign({ _id: userI._id }, <jwt.Secret>JwtController.jwt_passphrase, { expiresIn: "30m" }, (err: Error, token: string) => {
                                    if (err) console.log(`JWT ERROR: ${err}`);
                                    res.status(200).json({ token: token });
                                });
                            } else {
                                res.status(404).json({ "error": 'Identifiant ou mot de passe incorrect.' })
                            }
                        })
                } else {
                    res.status(404).json({ "error": 'Identifiant ou mot de passe incorrect.' })
                }
            })
            .catch((err: any) => res.status(500).send(err));
    }

    /**
     * Vérifie si un token JWT existe
     * @param req 
     * @param res 
     * @param next 
     */
    public static verifyToken(req: Request, res: Response, next: NextFunction): void {
        const bearerHeader: string | undefined = req.headers['authorization'];
        if (bearerHeader !== undefined) {
            const bearerToken: string = bearerHeader.split(' ')[1];
            jwt.verify(bearerToken, <string | Buffer>JwtController.jwt_passphrase, (err: Error) => {
                if (err) {
                    res.sendStatus(403);
                    return;
                }
                next();
            })
        } else {
            res.sendStatus(403);
        }
    }
}