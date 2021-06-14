import { lazy } from 'react'
import { RouteProps } from 'react-router'

export interface PrivateRouteObject extends RouteProps {
  exact: boolean
  path: string
  breadcrumb: string
  component: any
  title: string
}

const Profile = lazy(() => import('../features/Profile'))
const Login = lazy(() => import('../features/Login'))
const SignUp = lazy(() => import('../features/SignUp'))

const PRIVATE_ROUTES: PrivateRouteObject[] = [
  {
    exact: false,
    path: '/auth/profile/',
    breadcrumb: 'My Profile',
    component: Profile,
    title: 'My Profile'
  }
]

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: 'login',
    path: '/',
    component: Login
  },
  {
    exact: true,
    title: 'signup',
    path: '/signup',
    component: SignUp
  }
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }