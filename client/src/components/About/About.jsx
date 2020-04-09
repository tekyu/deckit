import React from "react";
import { SvgIcon } from "@material-ui/core";
import ScoreIcon from "../Generic/Icons/ScoreIcon";

const About = () => {
  return (
    <div>
      <h1>{`This project wouldn't be possible without:`}</h1>
      <div>
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default About;
