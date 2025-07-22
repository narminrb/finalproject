// import mongoose from 'mongoose';

// const CartItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Shop', // or whatever your product model name is
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1,
//   },
// });

// const CartSchema = new mongoose.Schema({
//   userId: {
//     type: String, // or mongoose.ObjectId if using auth
//     required: true,
//   },
//   items: [CartItemSchema],
// }, { timestamps: true });

// export default mongoose.model('Cart', CartSchema);
