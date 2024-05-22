import { FC } from 'react';

import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Slider } from '@/shared/ui/Slider';
import SliderWidgetLoader from '@/widgets/Slider/ui/SliderWidgetLoader';

interface ImageData {
  _id: string;
  image: string;
}

const SliderWidget: FC = () => {
  const { data, error, isLoading } = useAxios<ImageData[]>(`${ApiRoutes.CONTROL_PANEL}`);

  const renderContent = () => {
    if (isLoading) {
      return <SliderWidgetLoader />;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (!data || data.length === 0) {
      return <p>No data to display.</p>;
    }

    return (
      <div className="max-w-[979px] lg:h-[504px] w-full">
        <Slider images={data} />
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default SliderWidget;
