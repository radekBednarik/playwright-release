import React from "react";
import { Text } from "ink";

interface MainComponentProps {
  mdContent: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ mdContent }) => {
  return <Text>{mdContent}</Text>;
};

export default MainComponent;
