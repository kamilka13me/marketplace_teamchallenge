import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
