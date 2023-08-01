import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DbService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'somedb',
      password: 'meh',
      port: 5432,
      connectionTimeoutMillis: 3000,
    });
    this.client.connect();
  }

  public query(sql: string, values: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.client.query(sql, values, (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res.rows);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
