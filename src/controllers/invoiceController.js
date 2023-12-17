// const xendit  = require('../../config/xenditConfig');
// const { Invoice } = xendit;

// async function createAndHandleInvoice() {
//     const data = {
//       "amount": 10000,
//       "invoiceDuration": 172800,
//       "externalId": "test1234",
//       "description": "Test Invoice",
//       "currency": "IDR",
//       "reminderTime": 1
//     }
  
//     try {
//       const response = await xenditInvoiceClient.createInvoice({ data });
//       // Lakukan sesuatu dengan respons di sini
//       console.log(response);
//     } catch (error) {
//       // Tangani kesalahan jika ada
//       console.error(error);
//     }
//   }
  
//   // Panggil fungsi async
//   createAndHandleInvoice();
// // Create an instance of the Invoice class
// const invoice = new Invoice({});

// async function createInvoice(req, res) {
//   const { externalID, payerEmail, description, amount } = req.body;

//   try {
//     // Validate the request body or perform necessary checks before creating the invoice

//     // Create the invoice using Xendit's createInvoice method
//     const createdInvoice = await invoice.createInvoice({
//       externalID,
//       payerEmail,
//       description,
//       amount,
//     });

//     // Check if the invoice was created successfully
//     if (createdInvoice && createdInvoice.invoice_url) {
//       res.status(200).json({
//         message: 'Invoice created successfully',
//         data: createdInvoice,
//         invoiceURL: createdInvoice.invoice_url,
//       });
//     } else {
//       // If the invoice creation response doesn't contain the expected data
//       res.status(500).json({
//         message: 'Failed to create invoice',
//         error: 'Unexpected response from Xendit',
//       });
//     }
//   } catch (error) {
//     // Handle errors if invoice creation fails
//     console.error('Error creating invoice:', error);
//     res.status(500).json({
//       message: 'Failed to create invoice',
//       error: error.message,
//     });
//   }
// }

// module.exports = { createInvoice };
