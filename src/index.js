import React from "react";
import { render } from "react-dom";
import { LiteYouTubeEmbed } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto", border: "1px solid tomato" }}>
   <iframe width="560" height="315" src="https://www.youtube.com/embed/L2vS_050c-M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
);

render(<App />, document.getElementById("root"));
