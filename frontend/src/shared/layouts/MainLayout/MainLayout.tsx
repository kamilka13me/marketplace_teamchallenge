import { FC, ReactElement } from 'react';

interface Props {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

const MainLayout: FC<Props> = (props) => {
  const { content, header, footer } = props;

  return (
    <div className="flex flex-col mx-auto min-h-screen overflow-auto">
      {header}
      <main className="mt-[136px] flex-1">{content}</main>
      {footer}
    </div>
  );
};

export default MainLayout;
