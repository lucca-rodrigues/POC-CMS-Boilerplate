export interface Address {
  id?: string;
  zipCode?: string;
  location?: string;
  district?: string;
  number?: string;
  aditionalInfo?: string;
  stateId?: string;
  countryId?: string;
  cityId?: string;
  state?: string;
  country?: string;
  city?: string;
}

export interface AddressField {
  id?: string;
  label?: string;
  value?: string;
}
