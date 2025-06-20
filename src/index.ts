import { getMarkdown } from "./api";
import { parseMarkdown } from "./parser";

(async () => {
  const textMarkdown = await getMarkdown();

  if (!textMarkdown) {
    return null;
  }

  const parsed = await parseMarkdown(textMarkdown);
  console.log(parsed);
})();
