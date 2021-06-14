import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { useField } from 'formik'
import { FC, useState } from 'react'
import { Eye, EyeOff } from 'react-feather'

export type FormFieldProps = InputProps & {
  label?: string
  name: string
  type: string,
  labelColor: string,
  inputRightElement?: React.ReactNode
  inputLeftElement?: React.ReactNode
  inputRightWidth?: string | number
} 

const FormFieldPassword: FC<FormFieldProps> = ({ 
   label, 
   labelColor,
   inputRightElement,
   inputRightWidth,
   inputLeftElement,
   type,
   ...rest 
}) => { 
  const [field, meta] = useField(rest.name)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex mt="5" mb="5" flexDirection="column" width="100%">
      <FormControl>
        {label && (
          <FormLabel color={labelColor} htmlFor={field.name}>
            {label}
          </FormLabel>
        )}
        <InputGroup size="md">
          <Input
            variant="filled"
            size="md"
            focusBorderColor="blue.500"
            {...field}
            id={field.name}
            type={type}
          />
          <InputRightElement>
            <Icon w="20px" h="20px" onClick={handleClick} as={show ? EyeOff : Eye} color="brand.100" />
          </InputRightElement>
        </InputGroup>
        {meta.touched && meta.error ? (
          <Text data-testid={`${field.name}Error`} fontSize="small" mt={2} mb={2} color="error">
            {meta.error}
          </Text>
        ) : null}
      </FormControl>
    </Flex>
  )
}
  
export default FormFieldPassword