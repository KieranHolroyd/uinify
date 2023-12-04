import path from "path";

async function main() {
  // Regex for file name format 000_slug-name.sql
  const file_name_format = /^\d{3}_[a-z0-9-]+\.sql$/;

  // Extract name from arguments
  const slug = process.argv.slice(2).join("-");
  if (!slug) throw new Error("No slug provided");

  // Get all files in migrations directory
  const glob = new Bun.Glob("*.sql");
  const files = await Array.fromAsync(
    glob.scan({ cwd: path.join(import.meta.dir, "..", "src/lib/migrations") })
  );
  const file_count = files.length;

  // Create file name
  const file_name = `${file_count.toString().padStart(3, "0")}_${slug}.sql`;
  if (!file_name_format.test(file_name)) throw new Error("Invalid file name");

  // Create file path
  const file_path = path.join(
    import.meta.dir,
    "..",
    "src/lib/migrations",
    file_name
  );

  // Create file
  await Bun.write(
    Bun.file(file_path),
    `-- Path: src/lib/migrations/${file_name}
-- This file was automatically generated by scripts/create-migration.ts


CREATE TABLE IF NOT EXISTS tbl ();`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });