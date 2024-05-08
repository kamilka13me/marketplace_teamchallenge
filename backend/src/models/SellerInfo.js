import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  legalName: {
    type: String,
  },
  legalAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  cityIndex: {
    type: String,
  },
  //   communication: {
  //     r,
  //   },
  conditions: {
    type: String,
  },
  contacts: {
    // type: String,
  },
  descriptCompany: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
