import { FC } from 'react';

import block from '@/shared/assets/icons/block.svg?react';
import checked from '@/shared/assets/icons/checked-gold.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

type ManagingUserActionMessage = 'error' | 'ban' | 'recovery-password';

interface Props {
  actionType: ManagingUserActionMessage;
}

const ManagingUserActionModal: FC<Props> = (props) => {
  const { actionType } = props;

  if (actionType === 'recovery-password') {
    return (
      <VStack align="center" className="gap-3 p-4 rounded-2xl bg-dark-grey w-full">
        <Icon Svg={checked} width={24} height={24} className="stroke-error-red" />
        <Text
          Tag="h6"
          text=" На вказаний вами акаунт, було успішно надісланий лінк для відновлення паролю!"
          size="md"
          color="gray-light"
        />
      </VStack>
    );
  }

  if (actionType === 'ban') {
    return (
      <VStack align="center" className="gap-3 p-4 rounded-2xl bg-dark-grey w-full">
        <Icon Svg={block} width={30} height={30} className="stroke-error-red" />
        <Text
          Tag="h6"
          text="Вказаний вами акаунт, було успішно деактивовано!"
          size="md"
          color="gray-light"
        />
      </VStack>
    );
  }
};

export default ManagingUserActionModal;
