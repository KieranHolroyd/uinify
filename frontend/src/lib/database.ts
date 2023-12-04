import sqlite, { Database } from "better-sqlite3";

export class DBClient {
  static instance() {
    const db = new sqlite("db.sqlite", {
      verbose: process.env.NODE_ENV === "production" ? undefined : console.log,
    });

    if (!db.open) throw new Error("Could not open database");

    return db;
  }
}
