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
