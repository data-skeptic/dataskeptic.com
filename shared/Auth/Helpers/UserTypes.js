export const STANDART = 'user'
export const ADMINISTRATOR = 'admin'

const isUserType = (userType, predefinedType) => true //userType === predefinedType

export const isStandartUser = type => isUserType(type, STANDART)
export const isAdministratorUser = type => isUserType(type, ADMINISTRATOR)
