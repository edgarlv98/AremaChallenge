import express, { Request, Response } from 'express';
import { Config, User } from './lib';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';

/**
 * - Configurar express
 * - Usar el port en Config.ts
 * - Usa el lib/User para hacer todo el manejo de datos de usuarios
 * 	- Se agrego un ejemplo de como funciona la lib de Database
 */

/* Configure express */
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/signup', async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;

    console.log("EMAIL: " + email);
    console.log("PASSWORD: " + password);
    console.log("CONFIRM: " + confirmPassword);

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords not match' });
    }

    try {
        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        } 

        const newUserId = await User.createUser({ email, password });

        res.json({ message: 'User created successfully', userId: newUserId });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Inernal error' });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.getByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'User or Password incorrect' });
        }

        const token = jwt.sign({ id: user.user_id }, Config.jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Internal error' });
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Server running');
});

const PORT = Config.ports.api;

app.listen(PORT, () => {
    console.log("SERVER RUNNING IN: ", PORT);
});