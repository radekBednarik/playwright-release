import blessedContrib from "blessed-contrib";
import blessed from "blessed";

export function client(data: { heading: string; info: string }[]) {
  const screen = blessed.screen();
  const grid = new blessedContrib.grid({ rows: 1, cols: 2, screen });
  const list = blessed.list({
    parent: grid.set(0, 0, 1, 1, blessed.list, {
      label: "Releases",
      keys: true,
      mouse: true,
      border: "line",
    }),
    style: {
      selected: { bg: "blue", fg: "white", bold: true },
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
    content: data[0]?.info || "",
    border: "line",
    scrollable: true,
    alwaysScroll: true,
    keys: true,
    mouse: true,
    style: { focus: { border: { fg: "yellow" } } },
    scrollbar: { ch: " ", track: { bg: "grey" }, style: { bg: "blue" } },
  });

  infoBox.key(["h", "left"], () => {
    list.focus();
  });
  infoBox.key(["j", "down"], () => {
    infoBox.scroll(1);
  });
  infoBox.key(["k", "up"], () => {
    infoBox.scroll(-1);
  });

  screen.key(["C-c"], () => process.exit(0));
  screen.key(["q", "Q"], () => process.exit(0));

  screen.render();

  function updateInfoBox() {
    // @ts-expect-error this works, looks like type issue
    const idx = list.selected;
    infoBox.setContent(data[idx]?.info || "");
    screen.render();
  }
}
