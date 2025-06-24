import blessed from "blessed";

export function createSearch(grid: any) {
  return grid.set(0, 0, 1, 1, blessed.textbox, {
    label: "Search",
    inputOnFocus: true,
    style: {
      border: {
        fg: "yellow",
      },
      focus: {
        border: {
          fg: "red",
        },
      },
    },
  });
}

export function search(substr: string, data: ReleaseData[]) {
  if (substr.length === 0) {
    return data;
  }

  return data.filter((item) => {
    if (item.info.toLowerCase().includes(substr.toLowerCase())) {
      return true;
    }

    return false;
  });
}
