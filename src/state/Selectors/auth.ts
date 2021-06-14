import { selectorFamily, selector } from 'recoil'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOutUser 
} from '../../services/auth'
import { mapUserData } from '../../utils'

export const createUserQuery = selectorFamily({
  key: "createUserQuery",
  get: (user) => async () => {
      try {
        const userData: any = await createUserWithEmailAndPassword(user)
        return mapUserData(userData)
      } catch (e) {
        return e
      }
  }
})

export const userLoginQuery = selectorFamily({
  key: "userLoginQuery",
  get: (user) => async () => {
      try {
        const {email, password}: any = user; 
        const userData: any = await signInWithEmailAndPassword(email, password)
        return mapUserData(userData?.user)
      } catch (e) {
        return e
      }
  }
})

export const userLogOutQuery = selector({
  key: "userLogOutQuery",
  get: async () => {
      try {
        return await signOutUser()
      } catch (e) {
        return e
      }
  }
})