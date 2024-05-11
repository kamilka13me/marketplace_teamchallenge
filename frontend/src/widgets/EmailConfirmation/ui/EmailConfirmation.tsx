import { useState } from 'react';

import { $api } from '@/shared/api/api';
import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Icon } from '@/shared/ui/Icon';

const EmailConfirmation = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

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

  return (
    <div className="w-full lg:bg-dark-grey lg:rounded-2xl mb-[20px] p-[16px] flex gap-[12px]">
      <div>
        <Icon width={36} height={36} Svg={Exclamation} className="fill-[#F40A0A]" />
      </div>
      <div className="text-disabled">
        <p>
          Для продовження користування кабінетом просимо підтвердити реєстрацію у листі,
          відправленому на e-mail!
        </p>
        <p>
          Надіслати повторно підтвердження на e-mail?{' '}
          <button
            type="button"
            onClick={handlerEmail}
            className="text-[#D9C01B]"
            disabled={buttonDisabled}
          >
            Відправити
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmation;
