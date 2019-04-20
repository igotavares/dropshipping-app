export interface Customer {
    id: string;
    name: string;
    surname: string;
    documentNumber: string;
    contacts: Array<Contact>;
    gender: Gender,
    birthday: Date,
    email: string;
    company: string;
    address: Address;
    acceptMarketing: boolean;
    comments: String;
}

export interface Gender {M, F}

export interface Contact {
    telephone: string;
    mobile: string;
}

export interface Address {
    street: string;
    number: string;
    complement: string;
    country: string;
    state: string;
    town: string;
    zipCode: string;
}