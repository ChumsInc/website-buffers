const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
];

const plugins = [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", {
        "absoluteRunTime": false,
        "corejs": false,
        "helpers": false,
        "regenerator": true,
    }]
];


module.exports = {
    presets,
    plugins,
};
