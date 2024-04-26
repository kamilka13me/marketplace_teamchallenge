import { FC, useEffect, useState } from 'react';

import axios from 'axios';

import { Category } from '@/enteties/Category';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  category: Category;
}

const CategoryItem: FC<Props> = (props) => {
  const { category } = props;
  const [Svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}${category.image}`);

        setSvg(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchData();
  }, [category.image]);

  return (
    <VStack justify="center" align="center" className="gap-[10px]">
      {Svg !== null && (
        <div
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: Svg }}
          className="categorySvg w-5 h-5 flex justify-center items-center"
        />
      )}

      <Text
        Tag="p"
        size="sm"
        text={category.name}
        className="!text-disabled !leading-[24px] group-hover:!text-selected-dark group-focus:!text-selected-dark"
      />
    </VStack>
  );
};

export default CategoryItem;
