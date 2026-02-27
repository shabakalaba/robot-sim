import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class RobotMovementService {
  private db: Database.Database;

  constructor() {
    this.db = new Database('database.db');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS robot_movement (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        x_position INTEGER NOT NULL,
        y_position INTEGER NOT NULL,
        direction  INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    try {
      this.db.exec('ALTER TABLE robot_movement ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP');
    } catch (_) {}
  }

  create(x: number, y: number, direction: number) {
    const stmt = this.db.prepare(
      'INSERT INTO robot_movement (x_position, y_position, direction) VALUES (?, ?, ?)'
    );
    const info = stmt.run(x, y, direction);
    return { id: info.lastInsertRowid };
  }

  getLatest() {
    return this.db
      .prepare('SELECT * FROM robot_movement ORDER BY created_at DESC LIMIT 1')
      .get() || null;
  }
}
