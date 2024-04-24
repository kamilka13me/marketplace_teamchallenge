import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Product } from '@/enteties/Product';

type FormData = {
  data: Product;
};

const ProductForm: FC = () => {
  const methods = useForm<FormData>();

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*
         <NestedInput />
          function NestedInput() {
            const { register } = useFormContext() // retrieve all hook methods
            return <input {...register("test")} />
          }
        */}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

export default ProductForm;
