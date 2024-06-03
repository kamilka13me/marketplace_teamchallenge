import { adminOffersActions, adminOffersReducer } from './model/slice';
import { AdminOffersSchema } from './model/types/index';
import ManagingOffers from './ui/ManagingOffers';

export type { AdminOffersSchema };

export { ManagingOffers, adminOffersActions, adminOffersReducer };
