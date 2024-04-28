import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Product } from '@/enteties/Product';
import FirstBlockProductForm from '@/features/createProduct/ui/blocks/first/FirstBlockProductForm';
import FormMiddleBlock from '@/features/createProduct/ui/FormMiddleBlock';

interface FormProduct extends Product {
  selectCategory: string;
  selectSubCategory: string;
  selectSubSubCategory: string;
}

export type ApiProductSend = Omit<Product, '_id' | 'status' | 'views' | 'created_at'>;

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

  const { handleSubmit } = methods;

  // const onSubmit = (data: FormProduct) => {
  //   const sendData: ApiProductSend = {
  //     name: data.name,
  //     description: data.description,
  //     brand: data.brand,
  //     condition: data.condition,
  //     price: Number(data.price),
  //     discount: Number(data.discount),
  //     specifications: data.specifications,
  //     discountStart: data.discountStart,
  //     discountEnd: data.discountEnd,
  //     category: data.selectSubSubCategory,
  //     quantity: data.quantity,
  //     images: data.images,
  //   };
  //
  // };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col items-end">
          <FirstBlockProductForm />
          <FormMiddleBlock />
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
