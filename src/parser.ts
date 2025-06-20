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
  const rowItem: { heading: string; info: string } = { heading: "", info: "" };

  const rows = input.split("\n");

  let isInSection = false;

  for (const row of rows) {
    if (row.startsWith("## ") && !isInSection) {
      rowItem.heading = row.replace("## ", "").trim();
      isInSection = true;

      continue;
    }

    if (!row.startsWith("## ") && isInSection) {
      rowItem.info += row;

      continue;
    }

    if (row.startsWith("## ") && isInSection) {
      obj.push(Object.assign({}, rowItem));
      rowItem.heading = row.replace("## ", "").trim();
      rowItem.info = "";
    }
  }

  return obj;
}
