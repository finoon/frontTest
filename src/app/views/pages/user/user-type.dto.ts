export enum UserType {
   // ADMIN = 'ADMIN',
    OPERATEUR = 'OPERATEUR',
    AGENT = 'AGENT',
    SOCIETE = 'SOCIETE'
}


// Filter enum values to exclude "ADMIN"
//const userTypesWithoutAdmin = Object.values(UserType).filter(type => type !== UserType.ADMIN);