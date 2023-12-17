// Proxy middleware options
const {createProxyMiddleware} =  require("http-proxy-middleware");

const options = {
    target: process.env.ML_SERVICE_URL, // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        '^/api/v1/ml': '', // rewrite path
    },
};

// Create the proxy middleware for the specified endpoint
const mlProxy = createProxyMiddleware(options);

module.exports = mlProxy;