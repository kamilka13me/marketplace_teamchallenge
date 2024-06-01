import { FC } from 'react';

import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/shared/ui/Link';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ApiResponse {
  description: string;
  image: string;
  name: string;
  parentId: string;
  _id: string;
}

interface Props {
  categoryId: string;
  className?: string;
}

const ProductCategoriesLinkTree: FC<Props> = (props) => {
  const { categoryId, className } = props;

  const { data: category, isLoading: categoryIsLoading } = useAxios<ApiResponse[]>(
    `/category/getCategorysTree/${categoryId}`,
  );

  if (categoryIsLoading) {
    return (
      <div className={`${className}`}>
        <Skeleton height={20} width={120} />
      </div>
    );
  }

  return (
    <div className={`flex gap-1 items-center text-main-white ${className}`}>
      {category?.map((link, i) => (
        <span key={link._id} className="flex gap-1 items-center">
          <Link to={`/products?category=${link._id}`}>{link.name}</Link>
          {i < category.length - 1 && (
            <Icon width={12} height={12} Svg={arrow} className="fill-main-white" />
          )}
        </span>
      ))}
    </div>
  );
};

export default ProductCategoriesLinkTree;
