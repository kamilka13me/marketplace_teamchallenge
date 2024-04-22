// import { useEffect, useState } from 'react';

// import { getUserAuthData } from '@/enteties/User';
// import { $api } from '@/shared/api/api';
// import Arrow from '@/shared/assets/icons/Arrow.svg?react';
// import Star from '@/shared/assets/icons/Star.svg?react';
// import StarFull from '@/shared/assets/icons/StarFull.svg?react';
// import { ApiRoutes } from '@/shared/const/apiEndpoints';
// import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
// import { Icon } from '@/shared/ui/Icon';
// import { HStack, VStack } from '@/shared/ui/Stack';
// import { Text } from '@/shared/ui/Text';

// type RatingData = {
//   1: number;
//   2: number;
//   3: number;
//   4: number;
//   5: number;
// };

// type Ratings = {
//   current: RatingData;
//   previous: RatingData;
// };

// const SellerInfo = () => {
//   const ratings = useAppSelector(getUserAuthData);
//   // const [ratingsData, setRatingsData] = useState<Ratings | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await $api.get<Ratings>(
//           `${ApiRoutes.Ratings}/?sellerId=${ratings?._id}`,
//         );

//         setRatingsData(response.data);
//       } catch (error) {
//         console.error('Error fetching ratings:', error);
//       }
//     };

//     fetchProducts();
//   }, [ratings]);

//   // const calculateAverage = (ratingsData: RatingData): number => {
//   //   const totalCount =
//   //     ratingsData[1] + ratingsData[2] + ratingsData[3] + ratingsData[4] + ratingsData[5];

//   //   if (totalCount === 0) {
//   //     return 0.0;
//   //   }

//   //   const total =
//   //     ratingsData[5] * 5 +
//   //     ratingsData[4] * 4 +
//   //     ratingsData[3] * 3 +
//   //     ratingsData[2] * 2 +
//   //     ratingsData[1] * 1;

//   //   const average = total / totalCount;

//   //   return parseFloat(average.toFixed(1));
//   // };

//   // const totalSum = (ratingsData: RatingData): number => {
//   //   return (
//   //     (ratingsData[1] || 0) +
//   //     (ratingsData[2] || 0) +
//   //     (ratingsData[3] || 0) +
//   //     (ratingsData[4] || 0) +
//   //     (ratingsData[5] || 0)
//   //   );
//   // };
//   // const differencePrecent: number =
//   //   ((calculateAverage(ratingsData?.previous) - calculateAverage(ratingsData?.current)) /
//   //     calculateAverage(ratingsData?.previous)) *
//   //   100;

//   // const differenceReviews: number =
//   //   ((totalSum(ratingsData?.previous) - totalSum(ratingsData?.current)) /
//   //     totalSum(ratingsData?.previous)) *
//   //   100;
//   // const isPrecentDifference = differencePrecent >= 0;
//   // const isReviewsDifference = differenceReviews >= 0;

//   // const calculatePercentageForStar = (starRating: number, total: number): number => {
//   //   if (total === 0) {
//   //     return 0;
//   //   }
//   //   return (starRating / total) * 100;
//   // };

//   // const differenceStars = (ratingsData: RatingData, star: number): number => {
//   //   const total = totalSum(ratingsData);
//   //   const starRating = ratingsData[star];

//   //   return calculatePercentageForStar(starRating, total);
//   // };

//   // const starOnePercentage = differenceStars(ratingsData?.current?.current, 1);
//   // const starTwoPercentage = differenceStars(ratingsData?.current?.current, 2);
//   // const starThreePercentage = differenceStars(ratingsData?.current?.current, 3);
//   // const starFourPercentage = differenceStars(ratingsData?.current?.current, 4);
//   // const starSecondPercentage = differenceStars(ratingsData?.current?.current, 5);

//   return (
//     <VStack className="p-4 rounded-2xl bg-dark-grey max-w-[962px] mb-10">
//       <HStack className="py-6 border-r border-selected-dark mr-11">
//         <Text Tag="span" text="Кількість оцінок" size="md" className="text-white mb-2" />
//         <VStack gap="4" className="mb-[6px]">
//           {/* <Text
//             Tag="span"
//             // text={totalSum(ratingsData?.current).toString()}
//             size="2xl"
//             className="text-white"
//           /> */}
//           <VStack className="gap-[7px] items-center">
//             <Icon
//               Svg={Arrow}
//               width={8}
//               height={4}
//               // fill={isReviewsDifference ? 'green' : 'red'}
//               // className={isReviewsDifference ? 'rotate-0' : 'rotate-180'}
//             />
//             {/* <Text
//               Tag="span"
//               text={`${differenceReviews}%`}
//               size="sm"
//               color={isReviewsDifference ? 'green' : 'red'}
//             /> */}
//           </VStack>
//         </VStack>
//         <Text
//           Tag="span"
//           text="поставлених оцінок"
//           size="sm"
//           className="mr-11 text-disabled"
//         />
//       </HStack>
//       <HStack className="py-6 border-r border-selected-dark mr-11">
//         <Text Tag="span" text="Рейтинг оцінок" size="md" className="text-white mb-2" />
//         <VStack gap="4" className="mb-[6px]">
//           {/* <Text
//             Tag="span"
//             // text={calculateAverage(ratingsData?.current).toString()}
//             size="2xl"
//             className="text-white"
//           /> */}
//           <VStack className="gap-[7px] items-center mr-11">
//             <Icon
//               Svg={Arrow}
//               width={8}
//               height={4}
//               // fill={isPrecentDifference ? 'green' : 'red' }
//               // className={isPrecentDifference ? 'rotate-0' : 'rotate-180'}
//             />
//             {/* <Text
//               Tag="span"
//               text={`${differencePrecent}%`}
//               size="sm"
//               color={isPrecentDifference ? 'green' : 'red'}
//             /> */}
//           </VStack>
//         </VStack>
//         <ul className="flex gap-[7px] mr-11">
//           <li className="fill-secondary-yellow">
//             <Icon Svg={StarFull} width={15} height={15} />
//           </li>
//           <li className="flex fill-secondary-yellow">
//             <Icon Svg={StarFull} width={15} height={15} />
//           </li>
//           <li className="flex fill-secondary-yellow">
//             <Icon Svg={StarFull} width={15} height={15} />
//           </li>
//           <li className="flex fill-secondary-yellow">
//             <Icon Svg={StarFull} width={15} height={15} />
//           </li>
//           <li className="flex fill-secondary-yellow">
//             <Icon Svg={Star} width={15} height={15} />
//           </li>
//         </ul>
//       </HStack>
//       <ul className="flex-col gap-[18px] py-2 mr-2">
//         <li className="flex gap-2">
//           <VStack gap="2">
//             <VStack>
//               <Icon
//                 Svg={StarFull}
//                 width={10}
//                 height={10}
//                 className="my-[3px] mx-[6px] fill-secondary-yellow"
//               />
//               <Text Tag="span" text="5" size="md" className="text-white" />
//             </VStack>
//           </VStack>
//         </li>
//         <li className="flex gap-2">
//           <VStack>
//             <Icon
//               Svg={StarFull}
//               width={10}
//               height={10}
//               className="my-[3px] mx-[6px] fill-secondary-yellow"
//             />
//             <Text Tag="span" text="4" size="md" className="text-white" />
//           </VStack>
//         </li>
//         <li className="flex gap-2">
//           <VStack>
//             <Icon
//               Svg={StarFull}
//               width={10}
//               height={10}
//               className="my-[3px] mx-[6px] fill-secondary-yellow"
//             />
//             <Text Tag="span" text="3" size="md" className="text-white" />
//           </VStack>
//         </li>
//         <li className="flex gap-2">
//           <VStack>
//             <Icon
//               Svg={StarFull}
//               width={10}
//               height={10}
//               className="my-[3px] mx-[6px] fill-secondary-yellow"
//             />
//             <Text Tag="span" text="2" size="md" className="text-white" />
//           </VStack>
//         </li>
//         <li className="flex gap-2">
//           <VStack>
//             <Icon
//               Svg={StarFull}
//               width={10}
//               height={10}
//               className="my-[3px] mx-[6px] fill-secondary-yellow"
//             />
//             <Text Tag="span" text="1" size="md" className="text-white" />
//           </VStack>
//         </li>
//       </ul>
//       <ul className="flex flex-col py-2 mr-2 w-[188px]">
//         <li className="my-[9px] w-[100%] h-1 bg-green rounded-lg" />
//         <li className="my-[9px] w-[100%] h-1 bg-green rounded-lg" />
//         <li className="my-[9px] w-[100%] h-1 bg-green rounded-lg" />
//         <li className="my-[9px] w-[40%] h-1 bg-green rounded-lg" />
//         <li className="my-[9px] w-[70%] h-1 bg-green rounded-lg" />
//       </ul>
//       {/* <ul className="py-2 mr-[223px]">
//         <li>
//           <Text
//             Tag="span"
//             text=<p>{ratingsData?.current[5].toString()}</p>
//             size="sm"
//             className="text-white pb-1"
//           />
//         </li>
//         <li>
//           <Text
//             Tag="span"
//             text={ratingsData?.current[4]}
//             size="sm"
//             className="text-white"
//           />
//         </li>
//         <li>
//           <Text
//             Tag="span"
//             text={ratingsData?.current[3]}
//             size="sm"
//             className="text-white"
//           />
//         </li>
//         <li>
//           <Text
//             Tag="span"
//             text={ratingsData?.current[2]}
//             size="sm"
//             className="text-white"
//           />
//         </li>
//         <li>
//           <Text
//             Tag="span"
//             text={ratingsData?.current[1]}
//             size="sm"
//             className="text-white"
//           />
//         </li>
//       </ul> */}
//     </VStack>
//   );
// };

// export default SellerInfo;
