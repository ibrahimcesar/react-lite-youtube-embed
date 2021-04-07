import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import copy from 'rollup-plugin-copy'
import banner2 from 'rollup-plugin-banner2'

import packageJson from "./package.json";

const {
  version,
  name,
  license,
  repository,
  author,
} = packageJson;

export default {
  input: "./src/lib/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "default",
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    }
  ],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), banner2(() => `
    /**
* ${name} v${version}
*  ${repository.url}
*
*  Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.
*
*  This source code is licensed under the ${license} license found in the
*  LICENSE file in the root directory of this source tree.
*/
    `),
  copy({
      targets: [
        { src: 'src/lib/LiteYouTubeEmbed.css', dest: 'dist' },
        { src: './LICENSE', dest: 'dist' }
      ]
    })]
};