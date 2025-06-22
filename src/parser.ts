import { remark } from "remark";
import remarkParse from "remark-parse";

export async function parseMarkdown(text: string): Promise<string | null> {
  try {
    return (await remark().use(remarkParse).process(text)).toString();
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return null;
  }
}

export function parseMarkdownToJson(input: string) {
  const obj: { heading: string; info: string }[] = [];
  const rowItem: { heading: string; info: string } = {
    heading: "",
    info: "",
  };

  try {
    const rows = input.split("\n");

    let isInSection = false;
    let isInLiteYouTube = false;

    for (const row of rows) {
      // remove YouTube Lite embed code
      if (row.startsWith("<LiteYouTube")) {
        isInLiteYouTube = true;
        continue;
      }

      if (isInLiteYouTube && !row.startsWith("/>")) {
        continue;
      }

      if (isInLiteYouTube && row.startsWith("/>")) {
        isInLiteYouTube = false;
        continue;
      }

      // fence the version info into section
      if (row.startsWith("## ") && !isInSection) {
        rowItem.heading = row.replace("## ", "").trim();
        rowItem.info = row;
        isInSection = true;

        continue;
      }

      if (!row.startsWith("## ") && isInSection) {
        rowItem.info += `${row}\n`;

        continue;
      }

      if (row.startsWith("## ") && isInSection) {
        obj.push(Object.assign({}, rowItem));
        rowItem.heading = row.replace("## ", "").trim();
        rowItem.info = row;
      }
    }
  } catch (error) {
    console.error("Error parsing markdown to JSON:", error);
    return null;
  }

  return obj;
}
