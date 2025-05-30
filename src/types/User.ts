export interface UserAddress {
  id: string;
  userId: string;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: UserAddress | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateRequestBody {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export interface AddressUpdateRequestBody {
  country: string;
  city: string;
  postalCode: string;
  street: string;
}
