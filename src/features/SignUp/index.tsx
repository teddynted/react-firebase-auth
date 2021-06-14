import { Button, Flex, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import { FC, useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { createUserQuery } from '../../state/Selectors/auth'
import { userState, isAuthenticating, isAuthenticated, authError } from '../../state/Atoms/auth'
import AuthWrap from '../../layouts/Auth'
import { SignUpFormValidation } from './validation'
import { InitialValues, SignUpProps } from './types'
import FormField from '../../components/FormField'
import FormFieldPassword from '../../components/FormFieldPassword'
import { Mail, User } from 'react-feather'
import { useHistory } from 'react-router-dom'

const SignUp: FC<SignUpProps> = () => {
  
  const history = useHistory()
  const userData = useRecoilValue(userState)
  
  useEffect(() => {
    if(userData){
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])
  
  const toast = useToast();
  const signUpUser = useRecoilCallback(({snapshot, set}) => async (userData : InitialValues) => {
    set(authError, {})
    const user = await snapshot.getPromise(createUserQuery(userData))
    if(user?.code && user?.message) {
      set(authError, {"code": user?.code, "message": user?.message})
      set(userState, {})
      toast({
        title: "Sign Up failed.",
        description: user?.message,
        status: "error",
        duration: 9000,
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
    <AuthWrap title="Create Account">
      <Flex width="320px" mb="20" direction="column" align="center" justify="center">
        <Formik
          validationSchema={SignUpFormValidation}
          initialValues={{
            email: '',
            password: '',
            displayName: ''
          }}
          onSubmit={async ({ email, password, displayName }, { setSubmitting, setStatus }) => {
            setStatus(null)
            try {
              setSubmitting(true)
              const user = {'email': email, 'password': password, 'displayName': displayName}
              signUpUser(user)
              setSubmitting(false)
            } catch (error) {
              setStatus(error)
            }
          }}
        >
          {({ isSubmitting, status }: FormikProps<InitialValues>) => (
            <Form style={{ width: '100%' }}>
              <FormField
                name="displayName"
                label="Display Name"
                placeholder="Display Name"
                icon={User}
              />
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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </AuthWrap>
  )
}

export default SignUp