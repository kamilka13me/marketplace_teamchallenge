/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import SupportCenterSelector from './components/SupportCenterSelector';

const SupportCenter: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="SupportCenter flex flex-col gap-4 w-full text-white">
      <SupportCenterSelector
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      Support Center
    </div>
  );
};

export default SupportCenter;
