import { FC } from 'react';

import Slider from 'react-slick';

import { Image } from '@/shared/ui/Image';
import NextArrow from '@/widgets/Slider/ui/NextArrow';
import PrevArrow from '@/widgets/Slider/ui/PrevArrow';

interface Props {
  images: string[];
}

const SliderWidget: FC<Props> = (props) => {
  const { images } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="max-w-[320px] md:max-w-[640px] xl:max-w-[979px]">
      <Slider {...settings} className="">
        {images.map((item) => (
          <div key={`${item + Math.random() * (20 - 1) + 1} `}>
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
