import path from 'path';
import { pathExistsSync, writeFileSync, readJsonSync } from 'fs-extra';

interface ConfigFile {
	debug: boolean,
	ports: {
		api: number,
	},
	db_config: {
		host: string,
		port: number,
		user: string,
		password: string,
		database: string,
	},
	jwtSecret: string
}

const default_config : ConfigFile = {
	debug: true,
	ports: {
		api: 9801,
	},
	db_config: {
		host: 'localhost',
		port: 3306,
		database: 'interview',
		user: 'root',
		password: 'melissa10',
	},
	jwtSecret: 'secret'
};

let Config : ConfigFile;
const CONFIG_DIR = path.join(__dirname, '..', '..', 'config.json');

if(!pathExistsSync(CONFIG_DIR)){
	Config = default_config;
	writeFileSync(CONFIG_DIR, JSON.stringify(Config, null, 3));
}else{
	Config = { ...default_config, ...readJsonSync(CONFIG_DIR) };
}

export default Config;