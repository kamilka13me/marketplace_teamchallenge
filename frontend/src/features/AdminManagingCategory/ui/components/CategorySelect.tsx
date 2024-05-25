import { FC, useEffect, useState } from 'react';

import axios from 'axios';

import { Category } from '@/enteties/Category';

interface Props {
  category: Category;
  selected: boolean;
}

const CategorySelect: FC<Props> = (props) => {
  const { category, selected } = props;
  const [Svg, setSvg] = useState<string | null>(null);
  const [svgIsLoading, setSvgIsLoading] = useState(true);

  useEffect(() => {
    if (!category.image) return;
    const fetchData = async () => {
      const response = await axios.get(`${category.image}`);

      const { data } = response;
      const chengedColorSWG = data.replace(/fill="[^"]*"/g, 'fill="#C6C6C6"');

      setSvg(chengedColorSWG);
      setSvgIsLoading(false);
    };

    fetchData();
  }, [category.image]);

  return (
    <span
      className={`flex flex-row gap-[8px] items-center truncate ${selected ? 'font-medium' : 'font-normal'}`}
    >
      {!svgIsLoading && Svg !== null ? (
        <div
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: Svg }}
          className="w-[16px] h-[16px] flex justify-center items-center fill-white"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-[16px] h-[16px] flex justify-center items-center"
        />
      )}
      {category.name}
    </span>
  );
};

export default CategorySelect;
