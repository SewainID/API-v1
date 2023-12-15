const xenditClient = require('xendit-node');

const xendit = new xenditClient({
    secretKey: process.env.XENDIT_API_KEY ||
    'xnd_development_...',
});

module.exports = xendit;