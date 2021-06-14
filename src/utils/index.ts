import { getUserDocument } from '../services/auth'

export const mapUserData = async (user: object) => {
    const {
      phoneNumber, 
      emailVerified,
      createdAt,
      lastLoginAt,
      uid,
      email,
      expirationTime,
      za
    } : any = user
    const document: any = await getUserDocument(uid)
    return {
      jwt: za,
      user: {
        cellphoneNumber: phoneNumber,
        confirmed: emailVerified,
        created_at: createdAt,
        email: email,
        expoPushToken: null,
        name: document?.displayName,
        resetPasswordToken: null,
        id: uid,
        updated_at: lastLoginAt,
        username: email,
        expirationTime: expirationTime
      }
    }
}