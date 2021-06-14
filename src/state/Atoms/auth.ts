import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const userState = atom({
  key: 'userState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

export const isAuthenticating = atom({
  key: 'isAuthenticating',
  default: false
})

export const isAuthenticated = atom({
  key: 'isAuthenticated',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const authError = atom({
  key: 'authError',
  default: {}
})