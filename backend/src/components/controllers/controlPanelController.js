import Banner from '../../models/Banner.js';

const controlPanelController = {
  // Get all banners
  getBanner: async (req, res) => {
    try {
      const banners = await Banner.find({});

      res.status(200).json(banners);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Add a new banner
  addNewBanner: async (req, res) => {
    try {
      const { images } = req.body;

      // Check if the images array exists and is not empty
      if (images && images.length > 0) {
        const savedBanners = await Promise.all(
          images.map(async (imageName) => {
            const imagePath = `/static/banners/${imageName}`; // Adding a prefix to the file name
            const newBanner = new Banner({ image: imagePath }); // Creating a new banner card with the full image path
            const savedBanner = await newBanner.save(); // Saving the banner card in the database

            return savedBanner; // Return the saved banner for the `savedBanners` array
          }),
        );

        res.json(savedBanners); // Sending the array of saved banners as a response
      } else {
        res.status(400).send('No images provided');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Remove banner by id
  deleteBanner: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBanner = await Banner.findByIdAndDelete(id);

      if (!deletedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Remove all banners
  deleteAllBanner: async (req, res) => {
    try {
      await Banner.deleteMany({});
      res.status(200).json({ message: 'All banners deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default controlPanelController;
