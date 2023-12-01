import sqlite, { Database } from "better-sqlite3";

function tableExists(db: Database, table: string) {
  return (
    db.prepare("SELECT name FROM sqlite_master WHERE name=?").get(table) !==
    undefined
  );
}

export async function GET(req: Request) {
  try {
    let db = database.instance();
    let changed;
    if (tableExists(db, "items")) {
      changed = db.prepare("INSERT INTO items (name) VALUES ('test')").run();
    } else {
      db.prepare("CREATE TABLE items (name TEXT)").run();
      changed = db.prepare("INSERT INTO items (name) VALUES ('test')").run();
    }
    if (changed.changes === 0)
      return new HTTPResponse({
        message: "Could not insert item into database",
      }).toJSON();

    return new HTTPResponse({
      message: "Successfully inserted item into database",
      data: changed,
    }).toJSON();
  } catch (err: any) {
    console.error("Sqlite Error:", err?.message);
    process.env.VERBOSE && console.error(err);
    return new HTTPResponse({
      message: "Could not insert item into database",
    }).toJSON();
  }
}

class database {
  static instance() {
    const db = new sqlite("db.sqlite", {
      verbose: process.env.NODE_ENV === "production" ? undefined : console.log,
    });

    if (!db.open) throw new Error("Could not open database");

    return db;
  }
}

export type HTTPResponseOpts = {
  message?: string;
  status?: number;
  code?: number;
  data?: any;
};

class HTTPResponse {
  message: string;
  status: number;
  code: number;
  data: any;

  constructor({ message, status, code, data }: HTTPResponseOpts) {
    this.message = message ?? "Undefined Response";
    this.status = status ?? 200;
    this.code = code ?? 200;
    this.data = data;
  }

  toJSON() {
    return new Response(
      JSON.stringify({
        message: this.message,
        data: this.data,
        code: this.code,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: this.status,
      }
    );
  }
}
