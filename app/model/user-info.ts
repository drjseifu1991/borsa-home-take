export type UserInfo = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    address: string,
    profilePic?: string,
    isBuyer: boolean
}


// Create a UserRegistrationModel by omitting 'id' from UserInfo
export type UserRegistrationModel = Omit<UserInfo, '_id'> & {
    password: string,
    confirmPassword: string
};