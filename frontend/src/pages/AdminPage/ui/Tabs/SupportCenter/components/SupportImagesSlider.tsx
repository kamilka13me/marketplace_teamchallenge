import { FC } from 'react';

import Slider from 'react-slick';

import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';

interface Props {
  images: string[];
}

const SupportImagesSlider: FC<Props> = (props) => {
  const { images } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider
      {...settings}
      className="min-w-[480px] min-h-[420px] w-[480px] h-[420px] flex justify-center items-center bg-dark-grey rounded-2xl"
    >
      {(images || []).map((item, i) => (
        <img
          key={i}
          src={item}
          alt={item}
          className="min-w-[480px] min-h-[420px] w-[480px] h-[420px] object-contain"
        />
      ))}
    </Slider>
  );
};

export default SupportImagesSlider;
