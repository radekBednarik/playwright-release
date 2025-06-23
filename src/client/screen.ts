import blessed from "blessed";

export function createScreen() {
  const screen = blessed.screen();

  screen.key(["C-c", "q", "Q"], () => process.exit(0));
  screen.key(["r", "R"], () => screen.render());

  return screen;
}
