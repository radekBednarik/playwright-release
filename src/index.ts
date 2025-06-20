import { getMarkdown } from "./api.js";
import { parseMarkdown, parseMarkdownToJson } from "./parser.js";

(async () => {
  const textMarkdown = await getMarkdown();

  if (!textMarkdown) {
    return null;
  }

  const parsed = await parseMarkdown(textMarkdown);

  if (!parsed) {
    return null;
  }

  const parsedJson = parseMarkdownToJson(parsed);

  console.log(parsedJson);
})();
