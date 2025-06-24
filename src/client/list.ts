import blessed from "blessed";

export function createList(grid: any, data: ReleaseData[]) {
  const list = grid.set(1, 0, 11, 1, blessed.list, {
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

  list.key(["down", "j"], () => {
    list.down(1);
  });
  list.key(["up", "k"], () => {
    list.up(1);
  });

  return list;
}
