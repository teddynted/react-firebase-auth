import { FC } from 'react'
import { Flex, Heading, Box } from '@chakra-ui/react'
import { AuthProps } from './types'

const AuthWrap: FC<AuthProps> = ({children, title, ...rest}) => {
  return (
    <Flex {...rest}>
      <Box mb="0" mt="5">
        <Heading>{title}</Heading>
      </Box>
      {children}
    </Flex>
  )
}

export default AuthWrap

AuthWrap.defaultProps = {
  flex: 1,
  height: '100%',
  flexDir: 'column',
  align: 'center',
  justify: 'center',
  width: '100%',
  bg: 'white'
}