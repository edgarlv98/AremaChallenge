import { format } from 'mysql2';
import { highlight } from 'cli-highlight'
import { createPool, Pool, escape } from 'mysql2/promise';
import Config from './Config';
import moment from 'moment';

var db_config = Config.db_config;

var connection: Pool;
(async ()=>{
	connection = createPool({
		...db_config,
		charset: 'utf8mb4',
		connectTimeout: 1000000,
		connectionLimit: 5,
      queueLimit: 10,
	});
})();
var debug = Config.debug;

if(Config.debug){
	__query(connection, 'SELECT 1', [], false);
	setInterval(()=>{
		try{
			__query(connection, 'SELECT 1', [], false);
		}catch(e){}
	}, 8000);
}

function verboseQuery(query: string, verbose: boolean = null, verbose_replace: string = null, timestamp: boolean=true){
	if((verbose || debug) && verbose!==false){
		if(verbose_replace){
			console.log(`\x1b[33m${verbose_replace}`, '\x1b[0m');
		}else if(timestamp){
			console.log(`\x1b[47m\x1b[30m[${moment().format('HH:mm:ss')}]\x1b[0m`, highlight(multiline(query), { language: 'sql' }));
		}else{
			console.log(highlight(multiline(query), { language: 'sql' }));
		}
	}
}

function verboseError(query: string, message: string, verbose: boolean){
	if((verbose || debug) && verbose!==false){
		console.log("\n\n[ERROR]", highlight(multiline(query), { language: 'sql' }));
		console.log(message);
		console.log('\n')
	}
}

function print(q: string){
	console.log("-- [PRINT]: " + highlight(q, { language: 'sql' }))
}

// =====================================
// QUERY
// =====================================
async function __query(connection: any, query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null){
	var q = format(query, args);
	verboseQuery(q, verbose, verbose_replace);
	try{
		var [rows] = (await connection.query(q));
		return rows;
	}catch(e){
		verboseError(q, e.message, verbose);
		throw e;
	}
}

async function query<T=any>(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<T[]>{
	return __query(connection, query, args, verbose, verbose_replace);
}


// =====================================
// QUERY ONE
// =====================================
async function __queryOne(connection: any, query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<any>{
	var q = format(query, args);
	verboseQuery(q, verbose, verbose_replace);
	try{
		var [rows] = (await connection.query(q));
		if(!rows || rows.length==0) return null;
		return rows[0];
	}catch(e){
		verboseError(q, e.message, verbose);
		throw e;
	}
}

async function queryOne<T=any>(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<T>{
	return __queryOne(connection, query, args, verbose, verbose_replace);
}


// =====================================
// QUERY ONE VALUE
// =====================================
async function __queryOneValue(connection: any, query: string, args: any[]=[], value: string, verbose: boolean = null, verbose_replace: string = null) : Promise<any>{
	var res = await __queryOne(connection, query, args, verbose, verbose_replace);
	if(!res) return false;
	return res[value];
}

function queryOneValue<T=any>(query: string, args: any[]=[], value: string, verbose: boolean = null, verbose_replace: string = null) : Promise<T>{
	return __queryOneValue(connection, query, args, value, verbose, verbose_replace);
}


// =====================================
// INSERT
// =====================================
async function __insert(connection: any, query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<number[]>{
	var q = format(query, args);
	verboseQuery(q, verbose, verbose_replace);
	try{
		var [rows] = (await connection.query(q));
		if(!rows.insertId) return [];
		if(rows.affectedRows>1){
			var r = []
			for(var i=0; i<rows.affectedRows; i++) r.push(rows.insertId+i)
			return r;
		}else return [rows.insertId];
	}catch(e){
		verboseError(q, e.message, verbose);
		throw e;
	}
}

async function insert(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<number[]>{
	return __insert(connection, query, args, verbose, verbose_replace);
}


// =====================================
// INSERT ONE
// =====================================
async function insertOne(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<number>{
	var ins = await insert(query, args, verbose, verbose_replace);
	if(ins.length==0) throw new Error('Error insertin');
	return ins[0];
}

async function __insertOne(connection: any, query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<number>{
	var ins = await __insert(connection, query, args, verbose, verbose_replace);
	if(ins.length==0) throw new Error('Error insertin');
	return ins[0];
}

export interface Transaction{
	query: <T=any>(query: string, args?: any[], verbose?: boolean, verbose_replace?: string)=>Promise<T[]>
	queryOne: <T=any>(query: string, args?: any[], verbose?: boolean, verbose_replace?: string)=>Promise<T>
	queryOneValue: <T=any>(query: string, args?: any[], value?: string, verbose?: boolean, verbose_replace?: string)=>Promise<T>
	insert: (query: string, args?: any[], verbose?: boolean, verbose_replace?: string)=>Promise<number[]>
	insertOne: (query: string, args?: any[], verbose?: boolean, verbose_replace?: string)=>Promise<number>
	commit: ()=>Promise<void>;
	rollback: ()=>Promise<void>;
}

// =====================================
// TRANSACTION
// =====================================
async function transaction() : Promise<Transaction>{
	var con = await connection.getConnection();
	await con.beginTransaction();
	verboseQuery('\n====> BEGIN TRANSACTION', null, null, false)
	return {
		query: <T=any>(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<T[]>=>{
			return __query(con, query, args, verbose, verbose_replace);
		},
		queryOne: <T=any>(query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null) : Promise<T>=>{
			return __queryOne(con, query, args, verbose, verbose_replace);
		},
		queryOneValue: (query: string, args: any[]=[], value: string, verbose: boolean = null, verbose_replace: string = null)=>{
			return __queryOneValue(con, query, args, value, verbose, verbose_replace);
		},
		insert: (query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null)=>{
			return __insert(con, query, args, verbose, verbose_replace);
		},
		insertOne: (query: string, args: any[]=[], verbose: boolean = null, verbose_replace: string = null)=>{
			return __insertOne(con, query, args, verbose, verbose_replace);
		},
		commit: async ()=>{
			verboseQuery('<==== COMMIT\n', null, null, false)
			await con.commit();
			return con.release()
		},
		rollback: async ()=>{
			verboseQuery('X==== ROLLBACK\n', null, null, false)
			await con.rollback();
			return con.release();
		}
	}
}

function casewhen(key: string, values: Array<{0: any, 1: any}>, else_key: string){
	if(values.length<=0) return '';
	var str = `(CASE ${format(key)} `
	for(var i of values){
		str += `WHEN ${format(i[0])} THEN ${format(i[1])} `
	}
	str += `ELSE ${format(else_key)} END)`
	return str;
}

function multiline(q: string){
	if(!debug) return q;
	return q.replace(/[\n\t ]/gi, ' ').replace(/  /gi, ' ');
}

export default {
	query,
	queryOne,
	queryOneValue,
	transaction,
	casewhen,
	insert,
	insertOne,
   format,
	print,
	escape,
	multiline,
}