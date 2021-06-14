import { FC } from 'react'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import ProfileWrap from '../../layouts/Profile'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { userState, isAuthenticating, isAuthenticated, authError } from '../../state/Atoms/auth'
import { userLogOutQuery } from '../../state/Selectors/auth'

const Profile: FC = () => {
  const {user}: any = useRecoilValue(userState)
  console.log(user);
  const logOut = useRecoilCallback(({snapshot, set}) => async () => {
    await snapshot.getPromise(userLogOutQuery)
    set(authError, {})
    set(userState, {})
    set(isAuthenticating, false)
    set(isAuthenticated, false)
  })
  return (
    <ProfileWrap>
      <Heading mt="5">Profile</Heading>
      <Box width="50%" d="flex" mt="5" alignContent="center" flexDir="row" justifyContent="center">
        <Text>Welcome back,</Text>
        <Text fontWeight="bold">{user?.user?.name}.</Text>
      </Box>
      <Button mt="5" variant="primary" onClick={() => {logOut()}}>Log Out</Button>
    </ProfileWrap>
  )
}

export default Profile