import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

import { Product, SellerProduct } from '@/enteties/Product';
import FirstBlockProductForm from '@/features/createProduct/ui/blocks/first/FirstBlockProductForm';
import FormMiddleBlock from '@/features/createProduct/ui/FormMiddleBlock';
import ImageUpload, { InputData } from '@/features/createProduct/ui/ImageUpload';
import { ProductStatuses } from '@/features/managingProducts';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface FormProduct extends Product {
  selectCategory: string;
  selectSubCategory: string;
  selectSubSubCategory: string;
}

interface Props {
  product?: SellerProduct;
  onCloseForm: () => void;
}

function convertIsoToDate(isoDate: string): string {
  if (isoDate === '') {
    return '';
  }

  const date = new Date(isoDate);

  // Extract day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed in JavaScript
  const year = date.getUTCFullYear();

  // Format the day and month to ensure two digits
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  // Construct the final formatted date string
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  return formattedDate;
}

const ProductForm: FC<Props> = (props) => {
  const { product, onCloseForm } = props;

  const methods = useForm<FormProduct>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || Number(''),
      discount: product?.discount || Number(''),
      brand: product?.brand || '',
      quantity: product?.quantity || Number(''),
      category: product?.category || '',
      condition: product?.condition || '',
      images: product?.images || [],
      description: product?.description || '',
      specifications: product?.specifications || [
        { specification: '', specificationDescription: '' },
      ],
      discountEnd: convertIsoToDate(product?.discount_end || ''),
      discountStart: convertIsoToDate(product?.discount_start || ''),
    },
  });

  const [inputs, setInputs] = useState<InputData[]>();
  const [imagesIsLoading, setImagesIsLoading] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchImageFile = async (url: string, index: number) => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}${url}`, {
          responseType: 'blob',
        });
        const blob = response.data;
        const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });

        return { id: index, previewUrl: url, file, rotation: 0 };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching image:', error);

        return { id: index, previewUrl: url, file: null, rotation: 0 };
      }
    };

    if (product?.images) {
      setImagesIsLoading(true);
      const fetchImages = async () => {
        const initialInputs = await Promise.all(
          product.images.map((image, index) => fetchImageFile(image, index)),
        ).finally(() => {
          setImagesIsLoading(false);
        });

        setInputs(initialInputs as InputData[]);
      };

      fetchImages();
    }
  }, [product]);

  const handleInputsChange = (newInputs: InputData[]) => {
    setInputs(newInputs);
  };

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormProduct) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('condition', data.condition);
    formData.append('status', 'under-consideration' as ProductStatuses);
    formData.append('price', String(data.price));
    formData.append('discount', String(data.discount));
    formData.append('specifications', JSON.stringify(data.specifications));

    const convertDate = (dateString: string): string => {
      if (dateString === '') {
        return '';
      }
      const parts = dateString.split('.');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      return `${year}-${month}-${day}`;
    };

    formData.append('discountStart', convertDate(data.discountStart));
    formData.append('discountEnd', convertDate(data.discountEnd));
    formData.append('category', category);
    formData.append('quantity', String(data.quantity));

    inputs?.forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formData.append('images', file.file);
    });

    try {
      if (product?._id) {
        await $api.put(`${ApiRoutes.PRODUCTS}/${product._id}`, formData);
      } else {
        await $api.post(ApiRoutes.PRODUCTS, formData);
      }

      return formData;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while saving product:', error);
    } finally {
      onCloseForm();
    }
  };

  const setCategoryHandler = (id: string) => {
    setCategory(id);
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end gap-5">
          <FirstBlockProductForm
            initialCategoryId={product?.category || ''}
            setCategory={setCategoryHandler}
          />
          <FormMiddleBlock hasDiscount={(product?.discount || 0) > 0 || false} />
          <ImageUpload
            onInputsChange={handleInputsChange}
            productImages={inputs}
            imagesIsLoading={imagesIsLoading}
          />
          <input
            type="submit"
            value="Зберегти"
            className="bg-main max-w-[320px] h-[52px] w-full rounded-lg mt-5"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
