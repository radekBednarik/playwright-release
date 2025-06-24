import blessedContrib from "blessed-contrib";
import { createScreen } from "./screen.js";
import { createList } from "./list.js";
import { infoBox } from "./infobox.js";
import { createSearch, search } from "./search.js";

export function client(data: ReleaseData[]) {
  const screen = createScreen();
  const grid = new blessedContrib.grid({ rows: 12, cols: 2, screen });
  const iBox = infoBox(grid, data);
  const list = createList(grid, data);
  const searchBox = createSearch(grid);

  iBox.key(["h", "left"], () => {
    list.focus();
  });

  list.key(["l", "right", "enter"], () => {
    iBox.focus();
  });
  list.on("select item", () => {
    const idx = list.selected;
    iBox.setMarkdown(data[idx]?.info || "");
    screen.render();
  });
  list.focus();

  // @ts-expect-error it is what it is
  searchBox.on("submit", (value) => {
    const results = search(value, data);

    list.on("select item", () => {
      const idx = list.selected;
      iBox.setMarkdown(results[idx]?.info || "");
      screen.render();
    });

    list.focus();
    list.setItems(results.map((item) => item.heading));

    iBox.setMarkdown(results[0]?.info || "");

    searchBox.clearValue();

    screen.render();
  });

  screen.key(["A-s", "s", "S"], () => {
    searchBox.focus();
  });

  screen.render();
}
