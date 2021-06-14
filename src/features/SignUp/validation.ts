import * as Yup from 'yup'

export const SignUpFormValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('An email address is required *'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters')
    .required('A password is required *'),
  displayName: Yup.string()
    .required('A display name is required *'),
})