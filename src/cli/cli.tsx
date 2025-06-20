import React from "react";
import MainComponent from "./main.component.jsx";
import { render } from "ink";

const cli = ({ mdContent }: { mdContent: string }) => {
  render(<MainComponent mdContent={mdContent} />);
};

export default cli;
