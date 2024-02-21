import Category from '../../models/Category.js';

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, image, description, parentId } = req.body;
      const category = new Category({ name, image, description, parentId });

      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
      res.status(500).send(error);
    }
  },
};

export default categoryController;
