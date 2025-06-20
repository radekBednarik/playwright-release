import React from "react";
import { render, Text } from "ink";

const cli = () => {
  const Demo = () => <Text>Hello World</Text>;

  render(<Demo />);
};

export default cli;
