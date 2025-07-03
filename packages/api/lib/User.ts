import db from './Database';
import { UserClass } from './Classes';

async function getUser(user_id: number){
	return db.queryOne<UserClass>('SELECT * FROM user WHERE user_id=?', [user_id]);
}

export default {
	getUser,
}