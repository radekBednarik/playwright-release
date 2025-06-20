import { getMarkdown } from "./api.js";
import { parseMarkdown } from "./parser.js";

(async () => {
  const textMarkdown = await getMarkdown();

  if (!textMarkdown) {
    return null;
  }

  const parsed = await parseMarkdown(textMarkdown);

  if (!parsed) {
    return null;
  }

  console.log(parsed);
})();
