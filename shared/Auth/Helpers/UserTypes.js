export const STANDART = 'user'
export const ADMINISTRATOR = 'admin'

const isUserType = (userType, predefinedType) => userType === predefinedType

export const isStandartUser = type => isUserType(type, STANDART)
export const isAdministratorUser = type => isUserType(type, ADMINISTRATOR)
