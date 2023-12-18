const { Xendit } = require('xendit-node');

const xendit = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});


const invoice = xendit.Invoice;

const createInvoice = async (req, res) => {
    try {
        const { externalID, payerEmail, description, amount } = req.body;
        const invoiceData = await invoice.createInvoice({
            externalID,
            payerEmail,
            description,
            amount,
        });
        res.status(200).json({
            message: 'Success Create Invoice',
            results: invoiceData
        });
    } catch (error) {
        console.error('Error Create Invoice:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createInvoice };