import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

const ProfileWrap: FC = ({children, ...rest}) => {
  return (
    <Flex {...rest}>
      {children}
    </Flex>
  )
}

ProfileWrap.defaultProps = {
  flex: 1,
  height: '100%',
  flexDir: 'column',
  align: 'center',
  justify: 'center',
  width: '100%',
  bg: 'white'
}

export default ProfileWrap