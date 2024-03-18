// import React, { FC, useEffect } from 'react';

// import { Product } from '@/enteties/Product';
// import ProductCard from '@/enteties/Product/ui/ProductCard/ProductCard';
// import { getWishlist, userActions } from '@/enteties/User';
// import { $api } from '@/shared/api/api';
// import { ApiRoutes } from '@/shared/const/apiEndpoints';
// import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
// import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

// const LikePage: FC = () => {
//   const dispatch = useAppDispatch();
//   const { wishlist } = useAppSelector(getWishlist);
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const productsData = await Promise.all(
//           wishlist.map(async (id) => {
//             const response = await $api.get(`${ApiRoutes.PRODUCTS}/${id}`);

//             return response.data;
//           }),
//         );

//         setProducts(productsData);
//       } catch (error) {
//         /* eslint-disable no-console */
//         console.error('Error fetching products:', error);
//       }
//     };

//     if (wishlist.length > 0) {
//       fetchProducts();
//     }
//   }, [wishlist]);

//   const handlerDeleteAll = async () => {
//     try {
//       const response = await $api.delete(`${ApiRoutes.WISHLIST}`);

//       dispatch(userActions.setUserWishList([]));

//       return response;
//     } catch (error) {
//       console.error('Error Wishlist:', error);
//     }
//   };

//   return (
//     <>
//       <button type="button" onClick={handlerDeleteAll} className="text-white mb-4">
//         Видалити все
//       </button>
//       <div className="flex flex-wrap bg-gray-500 gap-3">
//         {products.map(({product}) => (
//           <ProductCard key={product?.product?._id} product={product?.product} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default LikePage;
