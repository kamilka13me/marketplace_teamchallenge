import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { getUserAuthData, userActions } from '@/enteties/User';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';

interface Language {
  nativeName: string;
}

interface Languages {
  [key: string]: Language;
}

const lngs: Languages = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
};

interface Props {}

const MainPage: FC<Props> = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUserAuthData);

  const loginHandler = async () => {
    await dispatch(
      getUserByCredentials({
        email: 'user123@example.com',
        password: '12345678',
      }),
    );
  };

  return (
    <div>
      <div>
        {Object.keys(lngs).map((lng) => (
          <Button
            key={lng}
            style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </div>
      <div>{t('Edit')}</div>
      {user?.username}
      <Button onClick={loginHandler}>GET</Button>
      <Button onClick={() => dispatch(userActions.logout())}>Log out</Button>
    </div>
  );
};

export default MainPage;
