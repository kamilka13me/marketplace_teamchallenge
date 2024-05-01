import { FC } from 'react';

import Slider from 'react-slick';

import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';

interface ImageObject {
  _id: string;
  image: string;
}

interface Props {
  images: ImageObject[] | string[];
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
      {(images as ImageObject[] | string[]).map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          {typeof item === 'string' ? (
            <img
              src={`${process.env.BASE_URL}${item}`}
              alt={`image_${i}`}
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            <img
              src={`${process.env.BASE_URL}${item.image}`}
              alt={item._id}
              className="w-full h-full rounded-2xl object-cover"
            />
          )}
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
