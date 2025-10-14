import db from './Database';
import { UserClass } from './Classes';
import bcrypt from 'bcrypt';

async function getUser(user_id: number) {
	return db.queryOne<UserClass>('SELECT * FROM user WHERE user_id=?', [user_id]);
};

async function getByEmail(email: string) {
  	return db.queryOne<UserClass>('SELECT * FROM user WHERE email=?', [email]);
};

async function createUser(user: { email: string; password: string }) {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	return db.insertOne(
		'INSERT INTO user (email, password) VALUES (?, ?)',
		[user.email, hashedPassword]
	);
}

export default {
	getUser,
	getByEmail,
	createUser
};