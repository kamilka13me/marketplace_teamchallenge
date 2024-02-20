import Product from '../../models/Product.js';

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category, quantity, discount } = req.body;
      let { images } = req.body;

      images = images.map((name) => `/static/products/${name}`);

      const product = {
        name,
        description,
        price,
        category,
        quantity,
        discount,
        images,
      };

      const newProduct = new Product(product);
      const saveProduct = await newProduct.save();

      res.status(200).json({ message: 'default messege' });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;

      console.log(id);
      const product = await Product.findById(id);

      console.log(product);

      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { limit = 10, offset = 0, name, category } = req.query;
      let { sortBy, sortDirection } = req.query;

      // Building a filter object based on name and category
      const query = {};

      if (name) {
        query.name = { $regex: name, $options: 'i' }; // Search by name with case insensitivity
      }
      if (category) {
        query.category = category;
      }

      // Create a sorting object
      const sortObject = {};

      sortBy = sortBy || '_id';
      sortDirection = parseInt(sortDirection, 10) || 1;

      sortObject[sortBy] = sortDirection;
      // Retrieving products from the database
      const products = await Product.find(query)
        .sort(sortObject)
        .skip(offset)
        .limit(limit);

      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

export default productController;
