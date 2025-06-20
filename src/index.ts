import { getMarkdown } from "./api.js";
import { parseMarkdown, parseMarkdownToJson } from "./parser.js";
import { client } from "./client.js";

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

  if (!parsedJson) {
    return null;
  }

  client(parsedJson);
})();
