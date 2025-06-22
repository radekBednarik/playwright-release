import blessedContrib from "blessed-contrib";
import blessed from "blessed";

export function client(data: { heading: string; info: string }[]) {
  const screen = blessed.screen();
  const grid = new blessedContrib.grid({ rows: 1, cols: 2, screen });
  const list = grid.set(0, 0, 1, 1, blessed.list, {
    label: "Versions",
    style: {
      selected: { bg: "blue", fg: "white", bold: true },
      focus: { border: { fg: "blue" } },
    },
    selectable: true,
    selected: 0,
    interactive: true,
    items: data.map((item) => item.heading),
    vi: true,
    scrollbar: { ch: " ", track: { bg: "grey" }, style: { bg: "blue" } },
  });

  list.focus();

  list.key(["down", "j"], () => {
    list.down(1);
  });
  list.key(["up", "k"], () => {
    list.up(1);
  });
  list.key(["l", "right"], () => {
    infoBox.focus();
  });
  list.key(["enter"], () => {
    infoBox.focus();
  });

  list.on("select item", () => {
    updateInfoBox();
  });

  const infoBox = grid.set(0, 1, 1, 1, blessedContrib.markdown, {
    label: "Release notes",
    markdown: data[0]?.info || "",
    border: "line",
    scrollable: true,
    alwaysScroll: true,
    keys: true,
    mouse: true,
    style: { focus: { border: { fg: "red" } } },
    scrollbar: { ch: " ", track: { bg: "grey" }, style: { bg: "blue" } },
  });

  infoBox.key(["h", "left"], () => {
    list.focus();
  });
  infoBox.key(["j", "down"], () => {
    infoBox.scroll(1);
    screen.render();
  });
  infoBox.key(["k", "up"], () => {
    infoBox.scroll(-1);
  });

  screen.key(["C-c"], () => process.exit(0));
  screen.key(["q", "Q"], () => process.exit(0));

  screen.render();

  function updateInfoBox() {
    const idx = list.selected;
    // @ts-expect-error this actually really works, but type definitions are not correct
    infoBox.setMarkdown(data[idx]?.info || "");
    screen.render();
  }
}
