import { FC } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import ProfileWrap from '../layouts/Profile'
import { RouteComponentProps } from 'react-router-dom'

export const NotFound: FC<RouteComponentProps> = () => {
  return (
    <ProfileWrap>
      <Heading mt="5">Oops!</Heading>
      <Box mt="5">
        <Text fontWeight="bold">We couldn't find what you are looking for.</Text>
      </Box>
    </ProfileWrap>
  )
}