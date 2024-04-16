import React, { FC } from 'react';

interface Props {
  // dataLength: number;
  // itemsPerPage: number;
  // currentPage: number;
  // setPage: (val: number) => void;
}

const Pagination: FC<Props> = () => {
  // const { currentPage, setPage, dataLength, itemsPerPage } = props;

  // const renderPages = (
  //   pages: number,
  //   curentPage: number,
  //   setPage: (val: number) => void,
  // ) => {
  //   if (pages === 1) {
  //     return null;
  //   }
  //   if (pages < 5) {
  //     return (
  //       <>
  //
  //          {Array(pages)
  //           .fill(null)
  //           .map((_, i) => (
  //             <li
  //               key={i}
  //               className={`${currentPage === i + 1 ? 'bg-selected-dark' : ' text-white'} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
  //               onClick={() => setPage(i + 1)}
  //             >
  //               {i + 1}
  //             </li>
  //           ))}
  //       </>
  //     );
  //   }
  //   let pagesArr = [];
  //
  //   if (curentPage === 1) {
  //     pagesArr = [curentPage, curentPage + 1, curentPage + 2];
  //   } else if (curentPage + 1 === pages) {
  //     pagesArr = [curentPage - 2, curentPage - 1, curentPage];
  //   } else if (curentPage + 1 > pages) {
  //     pagesArr = [curentPage - 3, curentPage - 2, curentPage - 1, curentPage];
  //   } else if (curentPage >= 1) {
  //     pagesArr = [curentPage - 1, curentPage, curentPage + 1];
  //   } else pagesArr = [curentPage + 1, curentPage + 2, curentPage + 3];
  //
  //   return (
  //     <>
  //       {curentPage > 2 && (
  //         <li className="list-none" onClick={() => setPage(1)}>
  //           <Button
  //             variant="grey-outlined"
  //             onClick={() => {}}
  //             className={`${currentPage === 1 ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
  //           >
  //             <Text Tag="span" text="1" size="sm" color="white" />
  //           </Button>
  //         </li>
  //       )}
  //
  //       {pagesArr.map((page) => (
  //         <li onClick={() => setPage(page)} className="list-none">
  //           <Button
  //             variant="grey-outlined"
  //             onClick={() => {}}
  //             className={`${currentPage === page ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
  //           >
  //             <Text Tag="span" text={page.toString()} size="sm" color="white" />
  //           </Button>
  //         </li>
  //       ))}
  //       {curentPage < pages - 2 && (
  //         <VStack justify="center" className="gap-[4px] w-8 h-8">
  //           {Array(3)
  //             .fill(null)
  //             .map(() => (
  //               <div className="w-1 h-1 rounded-full bg-disabled self-end mb-2" />
  //             ))}
  //         </VStack>
  //       )}
  //
  //       {curentPage < pages && (
  //         <li onClick={() => setPage(pages)} className="list-none">
  //           <Button
  //             variant="grey-outlined"
  //             onClick={() => {}}
  //             className={`${currentPage === pages ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
  //           >
  //             <Text Tag="span" text={pages.toString()} size="sm" color="white" />
  //           </Button>
  //         </li>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      asd
      {/* {renderPages(Math.ceil(dataLength / itemsPerPage), currentPage, setPage)} */}
    </>
  );
};

export default Pagination;
