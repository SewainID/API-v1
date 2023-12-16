const xenditClient = require('xendit-node');

const xendit = new xenditClient({
    secretKey: process.env.XENDIT_API_KEY ||
    'xnd_public_development_sbXID2gxRaCfgcy5bOINsQ36taLYTA1H8ZfwQx2gBeL47JT3PnSQRnmQY5Y',
});

module.exports = xendit;