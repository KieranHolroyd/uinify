import { DBClient } from "@/lib/database";
import { HTTPResponse } from "@/lib/http";

export async function GET(req: Request) {
  try {
    let db = DBClient.instance();

    const changed = db
      .prepare(
        "INSERT INTO items (name,description) VALUES ('test', 'a slightly longer test')"
      )
      .run();
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
