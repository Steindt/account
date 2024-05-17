import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err && (err as any).code == 'SQLITE_CANTOPEN') {
		// Doesn't exist
		let newdb = new sqlite3.Database('database.db', (err) => {
			console.error(err);
		});
		newdb.exec(`
    CREATE TABLE staged (
      username TEXT UNIQUE NOT NULL,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      email TEXT NOT NULL,
      hashed TEXT NOT NULL
    );`);
		return newdb;
	} else {
		console.error(err);
	}
});
