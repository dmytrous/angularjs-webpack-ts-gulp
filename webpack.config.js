const path = require('path');
const _sourceFolderName = "./app/scripts/";
const _outputFolderName = "./tmp/scripts/";

module.exports = {
    context: path.resolve(__dirname, _sourceFolderName ),
    entry: {
        main: "app.ts"
    },
    output: {
        // path: path.resolve(__dirname, _outputFolderName),
        filename: "[name].bundle.js",
        pathinfo: false,
        // publicPath: `./${_outputFolderName}/`,
        library: "[name]"
    },

    module: {
        rules: [
            {
                test: "/\.tsx?&/",
                use: ["awesome-typescript-loader"]
            }
        ]
    },

    /**Resolve modules*/
    resolve: {
        modules: ["node_modules", "bower_components", path.resolve(__dirname, _sourceFolderName)],
        descriptionFiles: ["package.json", "bower.json"],
        extensions: [".js", ".ts", ".tsx", ".json"]
    },

    /**Watch options*/
    watch: true,
    watchOptions: {
        poll: 500,
        aggregateTimeout: 300,
        ignored: ["node_modules", "bower_components"]
    },

    /**Development options*/
    devtool: "inline-source-map"

};

//TODO: think about production for example pathinfo: false. Think about Common chunks.
