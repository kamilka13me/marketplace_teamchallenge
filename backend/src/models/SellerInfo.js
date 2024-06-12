/**
 * @swagger
 * components:
 *  schemas:
 *    Seller:
 *      type: object
 *      properties:
 *        legalName:
 *          type: string
 *          description: Legal name of the seller
 *        legalAddress:
 *          type: string
 *          description: Legal address of the seller
 *        city:
 *          type: string
 *          description: City where the seller is located
 *        cityIndex:
 *          type: string
 *          description: Postal code of the city
 *        communication:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Contact'
 *          description: Array of communication methods including messengers and phones
 *        condition:
 *          type: string
 *          description: Conditions related to the seller
 *        contacts:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ContactDetail'
 *          description: Array of contacts, each with a phone and a person's name
 *        descriptCompany:
 *          type: string
 *          description: Description of the company
 *        emailAdvertisement:
 *          type: string
 *          description: Email for advertisements
 *        emailAdvice:
 *          type: string
 *          description: Email for advice
 *        emailMessage:
 *          type: string
 *          description: General email for messages
 *        generalCommunication:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Contact'
 *          description: General communication methods
 *        generalName:
 *          type: string
 *          description: General name of the seller
 *        idStateRegister:
 *          type: string
 *          description: State registration ID of the seller
 *        identificNumber:
 *          type: string
 *          description: Identification number of the seller
 *        tax:
 *          type: string
 *          description: Tax information of the seller
 *
 *    Contact:
 *      type: object
 *      properties:
 *        messenger:
 *          type: string
 *          description: Messenger handle
 *        phone:
 *          type: string
 *          description: Phone number
 *
 *    ContactDetail:
 *      type: object
 *      properties:
 *        phone:
 *          type: string
 *          description: Phone number of the contact
 *        person:
 *          type: string
 *          description: Name of the contact person
 */

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    messenger: { type: String, required: false },
    phone: { type: String, required: false },
  },
  { _id: false },
);

const contactDetailsSchema = new mongoose.Schema(
  {
    phone: { type: String, required: false },
    person: { type: String, required: false },
  },
  { _id: false },
);

const sellerSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  legalName: { type: String, required: false },
  legalAddress: { type: String, required: false },
  city: { type: String, required: false },
  cityIndex: { type: String, required: false },
  communication: { type: [contactSchema], required: false },
  condition: { type: Boolean, required: false },
  contacts: { type: [contactDetailsSchema], required: false },
  descriptCompany: { type: String, required: false },
  emailAdvertisement: { type: Boolean, required: false },
  emailAdvice: { type: Boolean, required: false },
  emailMessage: { type: Boolean, required: false },
  generalCommunication: { type: [contactSchema], required: false },
  generalName: { type: String, required: false },
  idStateRegister: { type: String, required: false },
  identificNumber: { type: String, required: false },
  tax: { type: Boolean, required: false },
  subscribe: { type: String, required: false, default: 'basic' },
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
