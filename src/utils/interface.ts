export interface ICompany {
    name: string;
    id: string; 
    creationDate: string;
    idAssociation: null | string | number;
    isEnseignement : boolean;
    isOrganismeFormation: boolean;
    isServicePublic: boolean;
    isSpectacle: boolean;
    isOrganismeSante: boolean;
    image?: string;
}

export interface ICompanyWithAddress extends ICompany {
    address: string;
    latitude: number ;
    longitude: number;
}

export interface ITotal {
    total: number; 
}