import Product from '../../models/Product.js';
import parseSpecifications from '../../utils/parseSpecification.js';

const productService = {
  createProduct: async (productData) => {
    try {
      const {
        name,
        description,
        brand,
        condition,
        status,
        price,
        category,
        quantity,
        discount,
        userId,
        discountStart,
        discountEnd,

        specifications,
      } = productData;
      let { images } = productData;

      images = images.map((name) => `/static/products/${name}`);

      const parsedSpecifications = parseSpecifications(specifications);

      const product = {
        name,
        description,
        price,
        brand,
        condition,
        status,
        category,
        quantity,
        discount,
        images,
        specifications: parsedSpecifications,
        sellerId: userId,
        discount_start: discountStart ? new Date(discountStart) : undefined,
        discount_end: discountEnd ? new Date(discountEnd) : undefined,
      };

      const newProduct = new Product(product);
      const saveProduct = await newProduct.save();

      return { product: saveProduct };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new Error({ message: 'An unexpected error occurred' });
    }
  },
};

export default productService;
