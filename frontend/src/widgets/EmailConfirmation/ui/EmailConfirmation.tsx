import { useEffect, useState } from 'react';

import { $api } from '@/shared/api/api';
import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';

const EmailConfirmation = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlerEmail = async () => {
    setButtonDisabled(true);

    try {
      const response = await $api.get(`${ApiRoutes.USER}/send-confirm-mail`);

      return response;
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
    } finally {
      setTimeout(() => {
        setButtonDisabled(false);
      }, 60000);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-full">
      {windowWidth >= 1024 ? (
        <div className="lg:bg-dark-grey lg:rounded-2xl mb-[20px] p-[16px] flex gap-[12px]">
          <div>
            <Icon width={36} height={36} Svg={Exclamation} className="fill-[#F40A0A]" />
          </div>
          <div className="text-disabled">
            <p>
              Для продовження користування кабінетом просимо підтвердити реєстрацію у
              листі, відправленому на e-mail!
            </p>
            <p>
              Надіслати повторно підтвердження на e-mail?{' '}
              <button
                type="button"
                onClick={handlerEmail}
                className="text-secondary-yellow"
                disabled={buttonDisabled}
              >
                Відправити
              </button>
            </p>
          </div>
        </div>
      ) : (
        isModalVisible && (
          <div>
            <ModalWindow
              onCloseFunc={() => setIsModalVisible(false)}
              className="bg-selected-dark rounded-[16px] px-[24px] py-[33px]"
            >
              <div className="flex justify-center mb-[22px]">
                <Icon
                  width={36}
                  height={36}
                  Svg={Exclamation}
                  className="fill-[#F40A0A]"
                />
              </div>
              <div className="flex justify-center">
                <h2 className="text-white mb-[16px] max-w-[200px]">
                  <span className="px-[24px]">Для продовження</span> користування
                  кабінетом
                </h2>
              </div>
              <p className="text-disabled text-sm mb-[33px]">
                Просимо підтвердити реєстрацію у листі, відправленому на e-mail! Надіслати
                повторно підтвердження на e-mail?
              </p>

              <div className="flex justify-center gap-[28px]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-disabled hover:underline focus:underline"
                >
                  Відхилити
                </button>
                <button
                  type="button"
                  onClick={handlerEmail}
                  className="text-secondary-yellow hover:underline focus:underline"
                  disabled={buttonDisabled}
                >
                  Відправити
                </button>
              </div>
            </ModalWindow>
          </div>
        )
      )}
    </div>
  );
};

export default EmailConfirmation;
