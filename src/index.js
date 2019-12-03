import React from "react";
import { render } from "react-dom";
import { LiteYouTubeEmbed } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto", border: "1px solid tomato" }}>
    <LiteYouTubeEmbed id="L2vS_050c-M" />
  </div>
);

render(<App />, document.getElementById("root"));
