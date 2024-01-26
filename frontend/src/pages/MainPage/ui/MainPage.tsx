import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import BugButton from '@/app/providers/ErrorBoundary/ui/BugButton';
import { Counter } from '@/enteties/Counter';
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
      <Counter />
      <BugButton />
    </div>
  );
};

export default MainPage;
