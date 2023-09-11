import * as fs from "fs";

const folderPath = "./front/"

const entries: string[] = fs.readdirSync(folderPath, { withFileTypes: true })
.filter(item => !item.isDirectory())
.map(item => "front/" + item.name);

await Bun.build({
  entrypoints: entries,
  outdir: './build',
});
