import React, { Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Loader from '../components/Loader'
import { NotFound } from '../features/NotFound'
import { isAuthenticating, isAuthenticated } from '../state/Atoms/auth'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'

interface RouteType extends RouteProps {
  component: any
}

const PrivateRoute = ({ component: Component, ...rest }: RouteType) => {
  const isUserAuthenticating = useRecoilValue(isAuthenticating)
  const isUserAuthenticated = useRecoilValue(isAuthenticated)
  if (isUserAuthenticating) {
    return <Loader bg="gray.100" />
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated ? (
          <Suspense fallback={<Loader color="gray.100" />}>
            <Component {...rest} />
          </Suspense>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

const PublicRoute = ({ component: Component, ...rest }: RouteType) => {
  const isUserAuthenticating = useRecoilValue(isAuthenticating)
  if (isUserAuthenticating) {
    return <Loader bg="gray.100" />
  }
  return (
    <Route {...rest}>
      <Component />
    </Route>
  )
}

const Navigation = () => {
  return <Router>
    <Suspense fallback={<Loader bg="gray.100" />}>
      <Switch>
        {PUBLIC_ROUTES.map((route) => {
          return <PublicRoute key={route.path} {...route} />
        })}
        <Route
          path="/auth"
          render={() => (
            PRIVATE_ROUTES.map((route) => {
              return <PrivateRoute key={route.path} {...route} />
            })
          )}
        />
        <Route render={NotFound} />
      </Switch>
    </Suspense>
  </Router>
}

export default Navigation
