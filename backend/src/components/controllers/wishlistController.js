import Product from '../../models/Product.js';
import User from '../../models/User.js';

const wishlistController = {
  addToWishlist: async (req, res) => {
    try {
      const { userId } = req.body;
      const { id: productId } = req.params; // Product ID from URL parameters

      // find user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check the availability of a product in your wishlist
      const index = user.wishlist.indexOf(productId);

      if (index !== -1) {
        // If the product is found, remove it from the wishlist
        user.wishlist.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: 'Product removed from wishlist successfully', user });
      } else {
        // If the product is not available, add it to the wishlist
        user.wishlist.push(productId);
        await user.save();
        res.status(200).json({ message: 'Product added to wishlist successfully', user });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the wishlist' });
    }
  },

  getAllWishlist: async (req, res) => {
    try {
      const { userId } = req.body;
      const { limit, offset } = req.params;

      const userWishlist = await User.findById(userId).populate({
        path: 'wishlist',
        options: {
          limit,
          skip: offset,
        },
      });

      const wishlist = { ...userWishlist.wishlist };

      res.status(200).json(wishlist);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'internal server error' });
    }
  },

  clearWishlist: async (req, res) => {
    try {
      const { userId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.wishlist = [];
      await user.save();

      res.status(200).json({ message: 'Wishlist cleared successfully', user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while clearing the wishlist' });
    }
  },
};

export default wishlistController;
