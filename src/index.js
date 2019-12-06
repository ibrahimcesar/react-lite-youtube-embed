import React from "react";
import { render } from "react-dom";
import { LiteYouTubeEmbed } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <LiteYouTubeEmbed id="puUPpVrIRkc" poster="maxresdefault" />
  </div>
);

render(<App />, document.getElementById("root"));
