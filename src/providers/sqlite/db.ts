import { Injectable } from '@angular/core';
import { SQLitePorter } from "@ionic-native/sqlite-porter";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import {Env} from "../../models/env";

import sql from '../../sql/db.sql';


declare var  ENV:Env;

@Injectable()

export class DB {

  constructor(
      public sqlitePorter: SQLitePorter,
      public sqlite: SQLite
  ) {

  }
  private openOrCreateDatabase():Promise<SQLiteObject>{
    return this.sqlite.create({
       name: ENV.DB_DATABASE,
      location: 'default'
    });
  }

  createSchema(){
    this.openOrCreateDatabase()
        .then((db:SQLiteObject) => {
           let dbInstance = db._objectInstance;
           this.sqlitePorter.importSqlToDb(dbInstance, sql)
               .then(() => console.log('SQLite imported'))
               .catch(e => console.log(e))
        })
  }

}
