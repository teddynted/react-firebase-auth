import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import SignUp from './'

describe('Sign Up Form Testing', () => {
    const history = createMemoryHistory()
    it('Should show email validation on blur', async () => {
      const { getByLabelText, getByTestId } = render(
        <RecoilRoot>
          <Router history={history}>
            <SignUp />
          </Router>
        </RecoilRoot>
      )
      const input = getByLabelText('Email')
      fireEvent.blur(input)
      await waitFor(() => {
        expect(getByTestId('emailError')).not.toBe(null)
        expect(getByTestId('emailError')).toHaveTextContent('An email address is required *')
      })
    })
    it('Should show password validation on blur', async () => {
      const { getByLabelText, getByTestId } = render(
        <RecoilRoot>
          <Router history={history}>
            <SignUp />
          </Router>
        </RecoilRoot>
      );
      const input = getByLabelText('Password')
      fireEvent.blur(input)
      await waitFor(() => {
        expect(getByTestId('passwordError')).not.toBe(null)
        expect(getByTestId('passwordError')).toHaveTextContent('A password is required *')
      })
    })
    it('Should validate form fields on submit click', async () => {
      const { getByText, getByTestId } = render(
        <RecoilRoot>
          <Router history={history}>
            <SignUp />
          </Router>
        </RecoilRoot>
      );
      const button = getByText('Sign Up')
      fireEvent.click(button)
      await waitFor(() => {
        expect(getByTestId('emailError')).toHaveTextContent('An email address is required *')
        expect(getByTestId('passwordError')).toHaveTextContent('A password is required *')
        expect(getByTestId('displayNameError')).toHaveTextContent('A display name is required *')
      })
    })
});