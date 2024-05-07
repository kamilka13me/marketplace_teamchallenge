import { FC, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Product } from '@/enteties/Product';
import FirstBlockProductForm from '@/features/createProduct/ui/blocks/first/FirstBlockProductForm';
import FormMiddleBlock from '@/features/createProduct/ui/FormMiddleBlock';
import ImageUpload, { InputData } from '@/features/createProduct/ui/ImageUpload';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface FormProduct extends Product {
  selectCategory: string;
  selectSubCategory: string;
  selectSubSubCategory: string;
}

const ProductForm: FC = () => {
  const methods = useForm<FormProduct>({
    defaultValues: {
      name: '',
      price: Number(''),
      discount: Number(''),
      brand: '',
      quantity: Number(''),
      category: '',
      condition: '',
      images: [],
      description: '',
      specifications: [{ specification: '', specificationDescription: '' }],
      discountEnd: '',
      discountStart: '',
    },
  });

  const [inputs, setInputs] = useState<InputData[]>([]);

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
    formData.append('status', 'Available');
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
    formData.append('category', data.selectSubSubCategory);
    formData.append('quantity', String(data.quantity));

    inputs.forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formData.append('images', file.file);
    });

    try {
      await $api.post(ApiRoutes.PRODUCTS, formData);

      return formData;
    } catch (error) {
      /* eslint-disable no-console */
      console.error('Error while saving product:', error);
    }
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end gap-5">
          <FirstBlockProductForm />
          <FormMiddleBlock />
          <ImageUpload onInputsChange={handleInputsChange} />
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
