import blessedContrib from "blessed-contrib";

export function infoBox(grid: any, data: { heading: string; info: string }[]) {
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

  infoBox.key(["j", "down"], () => {
    infoBox.scroll(1);
  });
  infoBox.key(["k", "up"], () => {
    infoBox.scroll(-1);
  });

  return infoBox;
}
