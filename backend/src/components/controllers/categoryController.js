import Category from '../../models/Category.js';

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { images, description, name, parentId = null } = req.body;
      const category = {
        name,
        description,
        parentId,
        image: `/static/category/${images}`,
      };

      const newCategory = new Category(category);
      const saveCategory = await newCategory.save();

      res.status(201).json({ message: 'New category created', category: saveCategory });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  getCategory: async (req, res) => {
    async function getSubcategories(category) {
      const subcategories = await Category.find({ parentId: category._id });

      const subcategoriesWithNested = await Promise.all(
        subcategories.map(async (subcategory) => {
          const subcategoryObject = subcategory.toObject();

          subcategoryObject.subcategories = await getSubcategories(subcategoryObject);

          return subcategoryObject;
        }),
      );

      return subcategoriesWithNested;
    }

    try {
      const rootCategories = await Category.find({ parentId: null });
      const rootCategoriesWithNested = await Promise.all(
        rootCategories.map(async (rootCategory) => {
          const rootCategoryObject = rootCategory.toObject();

          rootCategoryObject.subcategories = await getSubcategories(rootCategoryObject);

          return rootCategoryObject;
        }),
      );

      res.json(rootCategoriesWithNested);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error);
    }
  },
};

export default categoryController;
