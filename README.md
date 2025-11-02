Learning to make a p5 addon library [as described here](https://p5js.org/contribute/creating_libraries/)

Using vite and typescript.

### usage

At the moment it doesn't register the functions with p5 so has to be used as follows:

NeillUtils.collect(10, (ix) => ix \* ix);

### Build outputs

`yarn build`

The project builds a UMD file which can be loaded into a global mode p5.js sketch by the browser.

Removed type: module from package.json

> If the package.json does not contain "type": "module", Vite will generate different file extensions for Node.js compatibility. .js will become .mjs and .cjs will become .js.

### on CDNs

it automatically got published to unpkg here: https://unpkg.com/@nbogie/p5.neill-utils@0.0.4/dist/p5.neill-utils.umd.js
