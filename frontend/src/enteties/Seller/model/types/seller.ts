export interface Seller {
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
