import { FC } from 'react';

import Slider from 'react-slick';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

import { Image } from '@/shared/ui/Image';

interface Props {
  images: string[];
}

const SliderWidget: FC<Props> = (props) => {
  const { images } = props;

  const settings = {
    lazyRender: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-[979px]">
      <Slider {...settings} className="">
        {images.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <Image
              src={item}
              alt="fsdas"
              className="max-w-[1440px] max-h-[504px] w-full h-full rounded-2xl object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderWidget;
