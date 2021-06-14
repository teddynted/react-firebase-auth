import { FC } from 'react'
import { RecoilRoot } from 'recoil'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import SignUp from '../../../features/SignUp'

export const SignUpRender: FC = () => {
  const history = createMemoryHistory()
  return (
    <RecoilRoot>
      <Router history={history}>
        <SignUp />
      </Router>
    </RecoilRoot>
  )
}