import { UserType } from "./user-type.dto";

export interface UserDTO {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    phoneNumber: string;
    actif: boolean;
    dateCreation: string; 
    dateDesactivation: string; 
    cin: string;
    matriculeOperateurBanque: string;
    matriculeAgent: string;
    nif: string;
    userType: UserType;
  }

