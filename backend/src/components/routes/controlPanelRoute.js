import express from 'express';

import { appendFileNamesToBody, uploadBanners } from '../../middlewares/uploadBanners.js';
import controlPanelController from '../controllers/controlPanelController.js';

const controlPanelRoute = express.Router();
/**
 * @swagger
 * /control-panel/banner:
 *   get:
 *     summary: Returns a list of all banners
 *     tags: [Control Panel]
 *     responses:
 *       200:
 *         description: A list of banners.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Server Error'
 *                 error:
 *                   type: string
 *                   example: 'Error'
 *
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the banner
 *         image:
 *           type: string
 *           description: URL to the banner image
 *       example:
 *         _id: d5fE_asz
 *         image: /static/banners/sample-banner.jpg
 */

controlPanelRoute.get('/Banner', controlPanelController.getBanner);

/**
 * @swagger
 * /control-panel/banner:
 *   post:
 *     summary: Adds a new banner
 *     description: Allows you to upload a banner image and add it to your website.
 *     tags: [Control Panel]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Banner image
 *     responses:
 *       200:
 *         description: Banner successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Error uploading an image
 *
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Server Error'
 *                 error:
 *                   type: string
 *                   example: 'Error'
 */

controlPanelRoute.post(
  '/banner',
  uploadBanners.array('image'),
  appendFileNamesToBody,
  controlPanelController.addNewBanner,
);

/**
 * @swagger
 * /control-panel/banner/{id}:
 *   delete:
 *     summary: Removes a banner by its ID
 *     description: Deletes a banner from the database based on the provided ID.
 *     tags: [Control Panel]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the banner to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner deleted successfully
 *       404:
 *         description: Banner not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while trying to delete the banner
 */
controlPanelRoute.delete('/Banner/:id', controlPanelController.deleteBanner);

/**
 * @swagger
 * /control-panel/banner:
 *   delete:
 *     summary: Delete all banners
 *     description: Deletes all banners from the database.
 *     tags: [Control Panel]
 *     responses:
 *       200:
 *         description: All banners deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All banners deleted successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message detailing the server issue
 */
controlPanelRoute.delete('/Banner', controlPanelController.deleteAllBanner);

export default controlPanelRoute;
