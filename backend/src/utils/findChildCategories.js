import mongoose from 'mongoose';

import Category from '../models/Category.js';

const findChildCategories = async (parentId, categoryIds = []) => {
  const childCategories = await Category.find({
    parentId: new mongoose.Types.ObjectId(parentId),
  });

  const childIds = childCategories.map((childCategory) => childCategory._id.toString());

  categoryIds.push(...childIds);

  await Promise.all(
    childCategories.map((childCategory) =>
      findChildCategories(childCategory._id, categoryIds),
    ),
  );

  return categoryIds;
};

export default findChildCategories;
