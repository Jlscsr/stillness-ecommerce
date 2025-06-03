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
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: UserAddress | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "customer";
  acceptTerms: boolean;
  address?: UserAddress | null;
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
