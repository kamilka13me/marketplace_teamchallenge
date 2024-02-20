import { FC } from 'react';

import Slider from 'react-slick';

import img from '@/shared/assets/img/slider-img.png';
import { Image } from '@/shared/ui/Image';
import NextArrow from '@/widgets/Slider/ui/NextArrow';
import PrevArrow from '@/widgets/Slider/ui/PrevArrow';

interface Props {}

const SliderWidget: FC<Props> = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    dotsClass: 'slick-dots',
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative max-w-[979px] max-h-[504px]">
      <Slider {...settings}>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
        <div>
          <Image src={img} alt="fsdas" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderWidget;
