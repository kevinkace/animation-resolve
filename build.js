const { writeFile } = require("fs/promises");

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

const warn = `/*
!!! ========== ========================= ========== !!!
!!! ========== DO NOT EDIT FILE DIRECTLY ========== !!!
!!! ========== ========================= ========== !!!

this is generated by \`npm run build\`
*/

`;

function stringify(moduleType, src) {
    return warn.concat(
        moduleType.tmpl
            .replace("{header}", src.header)
            .replace("{jsdoc}", src.jsdoc)
            .replace("{src}", src.toString())
    );
}

Promise.all(
    moduleTypes.map(moduleType =>
        writeFile(`./dist/${moduleType.name}.js`, stringify(moduleType, src), "utf8")
    )
);
