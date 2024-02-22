/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - name
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the banner
 *         name:
 *           type: string
 *           description: The name of the banner
 *         description:
 *           type: string
 *           description: The description of the banner
 *         imageUrl:
 *           type: string
 *           description: The URL to the banner image
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the banner was created
 *         isActive:
 *           type: boolean
 *           description: Status of the banner's visibility
 *       example:
 *         _id: d5fE_asz
 *         image: /static/banners/8478bb72-76d7-4b9e-9db7-3b8a91dc33c1.png
 *         createdAt: 2021-07-21T17:32:28Z
 *         isActive: true
 *
 *   parameters:
 *     bannerId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The banner id
 */

import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  // Ви можете додати додаткові поля за потреби, наприклад, дату створення або статус активності
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
