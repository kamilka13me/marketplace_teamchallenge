import React, { FC } from 'react';

import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  dataLength: number;
  itemsPerPage: number;
  currentPage: number;
  setPage: (val: number) => void;
}

const Pagination: FC<Props> = (props) => {
  const { currentPage, setPage, dataLength, itemsPerPage } = props;

  const renderPages = (
    pages: number,
    curentPage: number,
    setPage: (val: number) => void,
  ) => {
    if (pages === 1) {
      return null;
    }
    if (pages < 5) {
      return (
        <>
          {Array(pages)
            .fill(null)
            .map((_, i) => (
              <li key={i} className="list-none">
                <Button
                  variant="grey-outlined"
                  onClick={() => setPage(i + 1)}
                  className={`${currentPage === i + 1 ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
                >
                  <Text Tag="span" text={(i + 1).toString()} size="sm" color="white" />
                </Button>
              </li>
            ))}
        </>
      );
    }
    let pagesArr = [];

    if (curentPage === 1) {
      pagesArr = [curentPage, curentPage + 1, curentPage + 2];
    } else if (curentPage + 1 === pages) {
      pagesArr = [curentPage - 2, curentPage - 1, curentPage];
    } else if (curentPage + 1 > pages) {
      pagesArr = [curentPage - 3, curentPage - 2, curentPage - 1, curentPage];
    } else if (curentPage >= 1) {
      pagesArr = [curentPage - 1, curentPage, curentPage + 1];
    } else pagesArr = [curentPage + 1, curentPage + 2, curentPage + 3];

    return (
      <>
        {curentPage > 2 && (
          <li className="list-none">
            <Button
              variant="grey-outlined"
              onClick={() => setPage(1)}
              className={`${currentPage === 1 ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text Tag="span" text="1" size="sm" color="white" />
            </Button>
          </li>
        )}

        {pagesArr.map((page, i) => (
          <li key={i} className="list-none">
            <Button
              variant="grey-outlined"
              onClick={() => setPage(page)}
              className={`${currentPage === page ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text Tag="span" text={page.toString()} size="sm" color="white" />
            </Button>
          </li>
        ))}
        {curentPage < pages - 2 && (
          <VStack justify="center" className="gap-[4px] w-8 h-8">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-disabled self-end mb-2" />
              ))}
          </VStack>
        )}

        {curentPage < pages && (
          <li className="list-none">
            <Button
              variant="grey-outlined"
              onClick={() => setPage(pages)}
              className={`${currentPage === pages ? '!bg-selected-dark' : ''} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text Tag="span" text={pages.toString()} size="sm" color="white" />
            </Button>
          </li>
        )}
      </>
    );
  };

  return <>{renderPages(Math.ceil(dataLength / itemsPerPage), currentPage, setPage)}</>;
};

export default Pagination;
