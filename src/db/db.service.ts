import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DbService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.PG_USERNAME ?? 'admin',
      host: process.env.PG_HOST ?? '127.0.0.1',
      database: process.env.PG_DATABASE ?? 'postgres',
      password: process.env.PG_PASSWORD ?? 'ABcd1234!',
      port: Number(process.env.PG_PORT ?? '5432'),
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
