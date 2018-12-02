const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const src = require("./src");

const moduleTypes = [{
    name : "cjs",
    tmpl :
`{header}

{jsdoc}
module.exports = {src};
`
}, {
    name : "esm",
    tmpl :
`{header}

{jsdoc}
export default {src}
`
}];

function stringify(moduleType, src) {
    return moduleType.tmpl
    .replace("{header}", src.header)
    .replace("{jsdoc}", src.jsdoc)
    .replace("{src}", src.toString());
}

Promise.all(
    moduleTypes.map(moduleType =>
        writeFile(`./dist/${moduleType.name}.js`, stringify(moduleType, src), "utf8")
    )
);
