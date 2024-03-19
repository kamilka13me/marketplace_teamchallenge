import { FC } from 'react';

import Slider from 'react-slick';

import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';

interface Props {
  images: {
    _id: string;
    image: string;
  }[];
  className?: string;
}

const CustomSlider: FC<Props> = (props) => {
  const { images, className } = props;

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
    <Slider {...settings} className={`min-w-[343px] min-h-[178px] ${className}`}>
      {images.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <img
            src={`${process.env.BASE_URL}${item.image}`}
            alt={item._id}
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
