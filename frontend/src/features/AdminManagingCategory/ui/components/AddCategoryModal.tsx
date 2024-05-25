/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC } from 'react';

import close from '@/shared/assets/icons/cancel.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { Text } from '@/shared/ui/Text';

interface Props {
  setAddeModalType: (type: 'category' | 'subcategory' | 'subsubcategory' | null) => void;
  addModalType: 'category' | 'subcategory' | 'subsubcategory' | null;
}

const AddCategoryModal: FC<Props> = (props) => {
  const { setAddeModalType, addModalType } = props;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log(file);
    }
  };

  return (
    <div>
      <ModalWindow
        className="flex flex-col gap-[10px] items-start !bg-selected-dark rounded-2xl max-w-[386px] w-full px-[50px]"
        onCloseFunc={() => setAddeModalType(null)}
      >
        <Icon
          Svg={close}
          width={24}
          height={24}
          className="fill-main-white self-end cursor-pointer"
          onClick={() => setAddeModalType(null)}
        />

        <span className="text-white text-[18px] font-outfit">
          Додайте назву категорії
        </span>

        <input
          type="text"
          placeholder="Введіть назву"
          className="bg-main-dark w-full max-w-[282px] h-[44px] rounded-lg p-4 text-disabled text-[14px] font-outfit"
        />

        <span className="text-white text-[18px] font-outfit">
          Завантажте іконку категорії
        </span>

        <span className="text-disabled text-[14px] font-outfit">
          Файли з форматів: png, jpg, svg
        </span>

        <div className="flex justify-center items-center w-full gap-[20px]">
          <label className="flex justify-center items-center cursor-pointer w-[108] border-[1px] border-disabled p-[10px]">
            <span className="text-disabled text-[16px] font-outfit">Обрати файл</span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <span className="text-disabled text-[16px] font-outfit">файл не вибрано</span>
        </div>

        <label className="flex justify-center items-center cursor-pointer rounded-lg h-[48px] bg-main w-full">
          <Text Tag="span" text="Додати" size="md" align="center" />
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <Button
          onClick={() => setAddeModalType(null)}
          className="text-sm"
          variant="border-bottom"
        >
          Відмінити
        </Button>
      </ModalWindow>
    </div>
  );
};

export default AddCategoryModal;
