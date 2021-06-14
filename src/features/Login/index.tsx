import { Button, Flex, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import { FC, useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { userState, isAuthenticating, isAuthenticated, authError } from '../../state/Atoms/auth'
import { userLoginQuery } from '../../state/Selectors/auth'
import AuthWrap from '../../layouts/Auth'
import { LoginFormValidation } from './validation'
import { InitialValues, LoginProps } from './types'
import FormField from '../../components/FormField'
import FormFieldPassword from '../../components/FormFieldPassword'
import { Mail } from 'react-feather'
import { useHistory } from 'react-router-dom'

const Login: FC<LoginProps> = () => {

  const authenticated = useRecoilValue(isAuthenticated)
  const history = useHistory();
  
  useEffect(() => {
    if(authenticated){
      history.push('/auth/profile')
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authenticated])
  
  const toast = useToast();
  
  const signIn = useRecoilCallback(({snapshot, set}) => async (userData : InitialValues) => {
    set(authError, {})
    set(isAuthenticating, true)
    const user = await snapshot.getPromise(userLoginQuery(userData))
    if(user?.code && user?.message) {
      set(authError, {"code": user?.code, "message": user?.message})
      set(userState, {})
      toast({
        title: "Sign In failed.",
        description: user?.message,
        status: "error",
        duration: 15000,
        isClosable: true,
      })
      set(isAuthenticated, false)
    }
    if((!user?.code && !user?.message) && user) {
      set(userState, {user})
      set(isAuthenticated, true)
    }
    set(isAuthenticating, false)
  })
  
  return (
    <AuthWrap title="Log In">
      <Flex width="320px" mb="20" direction="column" align="center" justify="center">
        <Formik
          validationSchema={LoginFormValidation}
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async ({ email, password }, { setSubmitting, setStatus }) => {
            setStatus(null)
            try {
              setSubmitting(true)
              const user = {'email': email, 'password': password}
              signIn(user)
              setSubmitting(false)
            } catch (error) {
              setStatus(error)
            }
          }}
        >
          {({ isSubmitting, status }: FormikProps<InitialValues>) => (
            <Form style={{ width: '100%' }}>
              <FormField
                name="email"
                label="Email"
                placeholder="Email"
                icon={Mail}
              />
              <FormFieldPassword 
                type="password" 
                name="password"
                label="Password"
                placeholder="Password"
                labelColor="black"
              />
              <Button
                isFullWidth
                mt={6}
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </AuthWrap>
  )
}

export default Login