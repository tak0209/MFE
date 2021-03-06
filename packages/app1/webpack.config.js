const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require('./package.json').dependencies;
const DashboardPlugin = require("@module-federation/dashboard-plugin");

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3001,
    },
    output: {
        publicPath: 'http://localhost:3001/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app1",
            remotes: {
                app2: "app2@http://localhost:3002/remoteEntry2.js",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps.react
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps['react-dom'],
                },
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            excludeChunks: ["remoteEntry"],
        }),
        new DashboardPlugin({
            dashboardURL: "http://localhost:3000/api/update",
            filename: "dashboard.json",
            metadata: {
                source: {
                    url: "http://localhost:3001"
                },
                baseUrl: "http://localhost:3002",
                remote: "http://localhost:3002/remoteEntry.js",
            }
        }),
    ],
};

