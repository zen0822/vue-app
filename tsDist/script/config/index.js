"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var path = require('path');
module.exports = function (_a) {
    var appName = _a.appName;
    var appConfigPath = path.resolve(__dirname, '../../' + appName + '/app.config.js');
    var appConfig = require(appConfigPath);
    var appConfigDir = path.dirname(appConfigPath);
    var mockPort = appConfig.mockPort || 3000;
    var gqlMock = appConfig.gqlMock || mockPort;
    var assetSubDirectory = appConfig.assetSubDirectory || 'static';
    var config = __assign({}, appConfig, { api: appConfig.api, apiProd: appConfig.apiProd, prod: {
            env: require('./prod.env'),
            assetRoot: path.resolve(__dirname, '../../dist'),
            assetPublicPath: './',
            assetSubDirectory: assetSubDirectory,
            sourceMap: false,
            gzip: appConfig.gzip || false,
            gzipExt: ['js', 'css']
        }, dev: {
            env: require('./dev.env'),
            mockPort: mockPort || 3000,
            hotPort: appConfig.hotPort || 80,
            assetPublicPath: '/',
            assetSubDirectory: assetSubDirectory,
            proxyTable: __assign({ '/gql': {
                    target: "http://localhost:" + gqlMock,
                    pathRewrite: {
                        '^/gql': ''
                    }
                }, '/api/**': "http://localhost:" + mockPort, '/sw.js': "http://localhost:5169" }, appConfig.proxy),
            cssSourceMap: false
        }, doc: {
            env: require('./prod.env'),
            htmlName: path.resolve(__dirname, '../../example/dist/index.html'),
            assetRoot: path.resolve(appConfigDir, appConfig.assetRoot),
            assetSubDirectory: 'static',
            assetPublicPath: './',
            sourceMap: true,
            gzip: true,
            gzipExt: ['js', 'css']
        }, sw: {
            env: require('./dev.env'),
            hotPort: 5169,
            assetRoot: path.resolve(appConfigDir, appConfig.assetRoot, './sw'),
            assetPublicPath: '/',
            assetSubDirectory: assetSubDirectory,
            prodSourceMap: false
        }, gql: {
            port: gqlMock
        }, global: {
            root: '../../',
            appDir: '../../app/'
        }, https: appConfig.https, htmlName: appConfig.htmlName, type: 'spa', tpl: appConfig.tpl });
    return config;
};
//# sourceMappingURL=index.js.map