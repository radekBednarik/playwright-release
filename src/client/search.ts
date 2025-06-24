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

  const substrLower = substr.toLowerCase();

  return data.reduce((acc, item) => {
    if (item.info.toLowerCase().includes(substrLower)) {
      acc.push({
        heading: item.heading,
        // I would love to use better highlighting here
        // but blessed-contrib markdown doesn't support it
        info: item.info.replaceAll(substrLower, `\`${substr}\``),
      });
    }
    return acc;
  }, [] as ReleaseData[]);
}
