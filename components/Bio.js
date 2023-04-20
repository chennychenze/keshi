import React from "react";
import Paragraph from "./Paragraph";

const Bio = ({ bio }) => {
  return (
    <div>
      {bio.split("\n").map((paragraph, index) => (
        <Paragraph key={index} marginBottom="1">
          {paragraph}
        </Paragraph>
      ))}
    </div>
  );
};

export default Bio;
