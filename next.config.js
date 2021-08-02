module.exports = {
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    },
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            // set server only modules to not resolve on the client to prevent this error on build --> Error: Can't resolve '...'
            config.resolve.fallback = {
                crypto: false,
                stream: false
            };
        }

        return config;
    }
}
