import { FC, useEffect, useState } from 'react';

import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  dataLength: number;
  itemsPerPage: number;
  currentPage: number;
  setPage: (val: number) => void;
  offset: number;
  fetchNext: () => void;
  fetchPrev: () => void;
  className?: string;
  isProducts?: boolean;
}

const Pagination: FC<Props> = (props) => {
  const {
    currentPage,
    setPage,
    dataLength,
    itemsPerPage,
    offset,
    fetchPrev,
    fetchNext,
    className,
    isProducts,
  } = props;

  const [width, setWidth] = useState<number>(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const selectedBtnColor = isProducts
    ? '!bg-secondary-yellow border-none'
    : '!bg-selected-dark';

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
                  className={`${currentPage === i + 1 && selectedBtnColor} ${isProducts && 'hover:bg-secondary-yellow border-disabled'} w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
                >
                  <Text
                    Tag="span"
                    text={(i + 1).toString()}
                    size="sm"
                    color={isProducts ? 'primary' : 'white'}
                  />
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
              className={`${currentPage === 1 && selectedBtnColor} ${isProducts && 'hover:bg-secondary-yellow border-disabled'}  w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text
                Tag="span"
                text="1"
                size="sm"
                color={isProducts ? 'primary' : 'white'}
              />
            </Button>
          </li>
        )}

        {pagesArr.map((page, i) => (
          <li key={i} className="list-none">
            <Button
              variant="grey-outlined"
              onClick={() => setPage(page)}
              className={`${currentPage === page && selectedBtnColor} ${isProducts && 'hover:bg-secondary-yellow border-disabled'}  w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text
                Tag="span"
                text={page.toString()}
                size="sm"
                color={isProducts ? 'primary' : 'white'}
              />
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
              className={`${currentPage === pages && selectedBtnColor} ${isProducts && 'hover:bg-secondary-yellow border-disabled'}  w-8 h-8 flex items-center justify-center rounded-md cursor-pointer`}
            >
              <Text
                Tag="span"
                text={pages.toString()}
                size="sm"
                color={isProducts ? 'primary' : 'white'}
              />
            </Button>
          </li>
        )}
      </>
    );
  };

  return (
    <VStack
      gap="4"
      justify="center"
      className={`w-full my-6 lg:mt-5 lg:mb-0 ${className}`}
    >
      <Button
        disabled={offset === 0}
        variant="grey-outlined"
        onClick={fetchPrev}
        className={`md:px-3 md:py-[3.3px] disabled:invisible ${isProducts && 'hover:bg-secondary-yellow'}`}
      >
        {width >= 768 ? (
          <Text
            Tag="span"
            text="Попередня"
            size="sm"
            color={isProducts ? 'primary' : 'white'}
          />
        ) : (
          <Icon
            Svg={arrowRight}
            width={32}
            height={32}
            className={`${isProducts ? 'fill-main-dark' : 'fill-white'} rotate-180`}
          />
        )}
      </Button>
      <VStack gap="2">
        {renderPages(Math.ceil(dataLength / itemsPerPage), currentPage, setPage)}
      </VStack>
      <Button
        disabled={offset + itemsPerPage >= dataLength}
        variant="grey-outlined"
        type="button"
        onClick={fetchNext}
        className={`md:px-3 md:py-[3.3px] disabled:invisible ${isProducts && 'hover:bg-secondary-yellow'}`}
      >
        {width >= 768 ? (
          <Text
            Tag="span"
            text="Наступна"
            size="sm"
            color={isProducts ? 'primary' : 'white'}
          />
        ) : (
          <Icon
            Svg={arrowRight}
            width={32}
            height={32}
            className={isProducts ? 'fill-main-dark' : 'fill-white'}
          />
        )}
      </Button>
    </VStack>
  );
};

export default Pagination;
