import path from "node:path";
import { DBClient } from "./database";

async function main() {
  // Get all files in migrations directory
  const glob = new Bun.Glob("migrations/*.sql");
  const files = await Array.fromAsync(
    glob.scan({ cwd: path.join(import.meta.dir) })
  );

  if (files.length === 0)
    return console.log(
      "No migrations exist, run `/scripts/create-migration.ts` to create one"
    );

  // Get database instance
  const db = DBClient.instance();

  for (const file of files) {
    // Get file name
    const file_name = path.basename(file);

    // Get file path
    const file_path = path.join(
      import.meta.dir,
      "..",
      "src/lib/migrations",
      file_name
    );

    try {
      // Get file contents
      const file_contents = await Bun.file(file_path).text();

      console.log("Running migration:", file_name);
      db.prepare(file_contents).run();

      return;
    } catch (err: any) {
      console.error("Migration Error:", err?.message);
      process.env.VERBOSE && console.error(err);
      return;
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
