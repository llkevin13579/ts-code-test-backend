import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DbService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.PG_USERNAME ?? 'postgres',
      host: process.env.PG_HOST ?? '127.0.0.1',
      database: process.env.PG_DATABASE ?? 'postgres',
      password: process.env.PG_PASSWORD ?? 'Password',
      port: Number(process.env.PG_PORT ?? '5432'),
    });
    this.client.connect();
    this.client.on('error', (err) => {
      console.error('Something bad has happened on database.', err.stack);
      this.client.end();
      process.exit(1);
    });
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
