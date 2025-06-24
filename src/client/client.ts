import blessedContrib from "blessed-contrib";
import { createScreen } from "./screen.js";
import { createList } from "./list.js";
import { infoBox } from "./infobox.js";
import { createSearch, search } from "./search.js";

export function client(data: ReleaseData[]) {
  const screen = createScreen();
  const grid = new blessedContrib.grid({ rows: 12, cols: 2, screen });
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

  const searchBox = createSearch(grid);

  // @ts-expect-error it is what it is
  searchBox.on("submit", (value) => {
    const results = search(value, data);

    list.setItems(results.map((item) => item.heading));
    list.focus();

    searchBox.clearValue();

    iBox.setMarkdown(data[0]?.info || "");

    screen.render();
  });

  screen.key(["A-s", "s", "S"], () => {
    searchBox.focus();
  });

  screen.render();
}
