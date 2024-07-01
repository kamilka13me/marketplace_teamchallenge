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

  updateProduct: async (productData) => {
    try {
      const {
        id,
        name,
        description,
        brand,
        condition,
        status,
        price,
        category,
        quantity,
        discount,
        discountStart,
        discountEnd,
        specifications,
      } = productData;
      let { images } = productData;

      images = images.map((name) => `/static/products/${name}`);
      if (specifications) {
        const parsedSpecifications = parseSpecifications(specifications);
      }

      const product = {
        id,
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
        specifications: specifications ? parseSpecifications : undefined,
        discount_start: discountStart ? new Date(discountStart) : undefined,
        discount_end: discountEnd ? new Date(discountEnd) : undefined,
      };
      let updatedProduct;
      // const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      //   new: true,
      // });

      if (!updatedProduct) {
        throw new Error(JSON.stringify({ message: 'Product not found' }));
      }

      return { product: updatedProduct };
    } catch (error) {
      const parsedError = JSON.parse(error.message);

      // Виведення повідомлення та додаткових даних
      // eslint-disable-next-line no-console
      console.log(parsedError.message); // Output: Product not found
      // eslint-disable-next-line no-console
      throw new Error({ message: 'An unexpected error occurred' });
    }
  },
};

export default productService;
