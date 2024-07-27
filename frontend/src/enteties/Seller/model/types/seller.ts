import { EntityState } from '@reduxjs/toolkit';

export interface Seller {
  _id: string;
  email: string;
  password: string;
  legalName: string;
  legalAddress: string;
  city: string;
  cityIndex: string;
  idStateRegister: string;
  identificNumber: string;
  tax: boolean;
  contacts: {
    phone: string;
    person: string;
  }[];
  communication: {
    messenger: string;
    phone: string;
  }[];
  sellerId: string;
  descriptCompany: string;
  generalName: string;
  generalCommunication: {
    messenger: string;
    phone: string;
  }[];
  emailAdvice: boolean;
  emailAdvertisement: boolean;
  emailMessage: boolean;
  conditions: boolean;
  subscribe: string;
}

export type SellerStatus = 'active' | 'blocked' | 'work' | 'close';

export interface UserSeller {
  accountStatus: SellerStatus;
  activity: {
    _id: string;
    date: string;
  };
  created_at: string;
  email: string;
  isAccountActive: boolean;
  isAccountConfirm: boolean;
  role: {
    _id: string;
    name: string;
  };
  username: string;
  _id: string;
}

export interface SellerContact {
  messenger: string;
  phone: string;
}

export interface SellerSchema {
  isLoading?: boolean;
  error?: string;
  sellerData?: Seller;
}

export interface SellersSchema extends EntityState<UserSeller, string> {
  isLoading?: boolean;
  error?: string;
  totalSellers: number;

  // pagination
  offset: number;
  limit: number;
  // filters
  startDate: string | Date;
  endDate: string | Date;
  search: string;
  sortDirection: '1' | '-1';

  _inited: boolean;
}
