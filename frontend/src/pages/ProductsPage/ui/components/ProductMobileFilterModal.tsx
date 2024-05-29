import { FC, useEffect, useState } from 'react';

import ProductsSidebar from '@/pages/ProductsPage/ui/components/ProductsSidebar';
import close from '@/shared/assets/icons/cancel.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {
  onClose: () => void;
}

const ProductMobileFilterModal: FC<Props> = (props) => {
  const { onClose } = props;

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  if (windowWidth < 1024) {
    return (
      <div className="fixed flex flex-col !top-0 !left-0 !bottom-0 !right-0 bg-main-white text-black z-[999] p-6 w-full h-screen overflow-y-auto">
        <Icon
          width={24}
          height={24}
          Svg={close}
          className="!fill-selected-dark absolute top-6 right-6"
          onClick={onClose}
        />
        <Text
          Tag="h5"
          text="Фільтр"
          size="xl"
          color="dark"
          bold
          className="self-center mt-12 mb-6"
        />
        <ProductsSidebar isMobile onCloseMobileModal={onClose} />
      </div>
    );
  }
};

export default ProductMobileFilterModal;
