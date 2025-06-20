import { remark } from "remark";
import remarkParse from "remark-parse";

(async () => {
  const md = await fetch(
    "https://raw.githubusercontent.com/microsoft/playwright/refs/heads/main/docs/src/release-notes-js.md",
  );

  const parsed = (
    await remark()
      .use(remarkParse)
      .process(await md.text())
  ).toString();

  console.log(parsed);
})();
