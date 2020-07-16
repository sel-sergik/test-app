const {	override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({
    "@components": path.resolve(__dirname, "./src/components"),
    "@constants": path.resolve(__dirname, "./src/constants"),
    "@containers": path.resolve(__dirname, "./src/containers"),
    "@interfaces": path.resolve(__dirname, "./src/interfaces"),
    "@mocks": path.resolve(__dirname, "./src/mocks"),
    "@routes": path.resolve(__dirname, "./src/routes"),
    "@selectors": path.resolve(__dirname, "./src/selectors"),
    "@services": path.resolve(__dirname, "./src/services"),
    "@store": path.resolve(__dirname, "./src/store"),
    "@hooks": path.resolve(__dirname, "./src/hooks")
	}),
);
