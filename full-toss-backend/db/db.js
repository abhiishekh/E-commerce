import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const product = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  stocks: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const user = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  iplTeam: { type: String, required: true },
  address: [
    {
      address: { type: String, required: true },
      landmark: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
  ],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
});

const ProductModule = mongoose.model('products', product);
const UserModule = mongoose.model('users', user);

export { UserModule, ProductModule };
