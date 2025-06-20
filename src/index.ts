import { getMarkdown } from "./api.js";
import { parseMarkdown } from "./parser.js";
import cli from "./cli/cli.jsx";

(async () => {
  const textMarkdown = await getMarkdown();

  if (!textMarkdown) {
    return null;
  }

  const parsed = await parseMarkdown(textMarkdown);

  if (!parsed) {
    return null;
  }

  cli({ mdContent: parsed });
})();
