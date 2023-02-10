const mongoose = require("mongoose");
const mtTransactionLogSchema = new mongoose.Schema({
  mtl_id: String,
  mtl_unique_order_id: String,
  mtl_unique_id: String,
  mtl_type: String,
  mtl_receipt: String,
  mtl_partial_payment: String,
  mtl_first_payment_min_amount: String,
  mtl_payment_gateway: String,
  mtl_currency: String,
  mtl_amount: String,
  mtl_amount_paid: String,
  mtl_amount_due: String,
  mtl_amount_status: String,
  mtl_text: String,
  mtl_qty: String,
  mtl_validity: String,
  mtl_start_from: String,
  mtl_to_end: String,
  mtl_transaction_id: String,
  mtl_transaction_other_data: String,
});

module.exports = mongoose.model("MtTransactionLog", mtTransactionLogSchema);
