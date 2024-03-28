import React from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';

const SliderWidgetLoader = () => {
  return (
    <Skeleton
      width="100%"
      height="176px"
      className="sm:!h-[300px] md:!h-[400px] lg:!h-[545px] lg:max-w-[979px] lg:!rounded-2xl"
    />
  );
};

export default SliderWidgetLoader;
