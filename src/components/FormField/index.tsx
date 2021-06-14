import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Icon,
  InputGroup,
  InputProps,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { useField } from 'formik'
import { FC } from 'react'

export type FormFieldProps = InputProps & {
  label?: string
  name: string
  icon?: any
  iconSize?: any
  labelColor?: string
  labelFontSize?: string,
  inputRightElement?: React.ReactNode
  inputLeftElement?: React.ReactNode
  inputRightWidth?: string | number
}
  
const FormField: FC<FormFieldProps> = ({
    label,
    icon,
    labelColor,
    labelFontSize,
    inputRightElement,
    inputLeftElement,
    inputRightWidth,
    ...rest
  }) => {
    const [field, meta] = useField(rest.name)
    return (
      <Flex mt="2" mb="2" flexDirection="column" width="100%">
        <FormControl>
          {label && (
            <FormLabel fontSize={labelFontSize} color={labelColor} htmlFor={field.name}>
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
            />
            <InputRightElement>
              <Icon w="20px" h="20px" as={icon} color="brand.100" />
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
  
export default FormField 