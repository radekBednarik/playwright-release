import blessedContrib from "blessed-contrib";
import { createScreen } from "./screen.js";
import { createList } from "./list.js";
import { infoBox } from "./infobox.js";

export function client(data: ReleaseData[]) {
  const screen = createScreen();
  const grid = new blessedContrib.grid({ rows: 1, cols: 2, screen });
  const iBox = infoBox(grid, data);

  iBox.key(["h", "left"], () => {
    list.focus();
  });

  const list = createList(grid, data);

  list.key(["l", "right", "enter"], () => {
    iBox.focus();
  });

  list.on("select item", () => {
    const idx = list.selected;
    iBox.setMarkdown(data[idx]?.info || "");
    screen.render();
  });

  list.focus();

  screen.render();
}
