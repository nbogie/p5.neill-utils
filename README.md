### What's this?

A p5 addon library just for my personal use containing various utility methods (zip, repeat, collect).

It is janky, badly designed, subject to change, and not currently recommended for use by others.

This document, then, is mostly notes to myself.

### usage

This is intended to be used in a global mode p5.js script (not as an ES module).

Add

```html
<script src="https://cdn.jsdelivr.net/npm/@nbogie/p5.neill-utils@latest"></script>
```

to your html and then to your p5.js script add

```js
const result = NeillUtils.collect(10, (ix) => ix * ix);
```

At the moment it doesn't register the functions with p5 so has to be used with that prefix.

I like that better than possibly colliding with other loaded libraries, anyway.

The namespace will likely change in future.

### installation from CDNs

You would normally add one of these in your html script tags

-   https://cdn.jsdelivr.net/npm/@nbogie/p5.neill-utils@latest

You can also specify the exact single file but I think most CDNs will serve it correctly from the above (whether because of main property in package.js? or because it's umd.js?)

-   https://unpkg.com/@nbogie/p5.neill-utils@latest/dist/p5.neill-utils.umd.js

### How's it made?

Made following these guidelines [as described here](https://p5js.org/contribute/creating_libraries/), and vite library mode.

Using vite and typescript. builds to a single umd javascript file.

### Build outputs

`yarn build`

The project builds a UMD file which can be loaded into a global mode p5.js sketch by the browser.

Removed type: module from package.json

> If the package.json does not contain "type": "module", Vite will generate different file extensions for Node.js compatibility. .js will become .mjs and .cjs will become .js.

###

typescript configs

-   tsconfig.json - the base config. used for type-checking and also extended by...
-   tsconfig.dts.json - exclusively for generating .d.ts files. Extends tsconfig.json

### resources

-   https://p5js.org/contribute/creating_libraries/
-   https://p5js.org/libraries/
