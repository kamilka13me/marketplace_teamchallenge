const productController = {
  default: async (req, res) => {
    res.status(200).json({ message: 'default messege' });
  },
};

export default productController;
