const { Xendit } = require('xendit-node');
const Payments = require('../../models/paymentModels');


const xendit = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});

const invoice = xendit.Invoice;

const createInvoice = async (req, res) => {
  try {
    const { externalID, payerEmail, description, amount } = req.body;
    const payment = await Payments.create({
      externalID,
      payerEmail,
      description,
      amount,
    });

    const invoiceData = await invoice.createInvoice({
      externalID,
      payerEmail,
      description,
      amount,
    });

    res.status(200).json({
      message: 'Success Create Invoice and Payment',
      results: { invoiceData, payment },
    });
  } catch (error) {
    console.error('Error Create Invoice and Payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createInvoice };