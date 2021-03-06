import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { LoginRender } from '../../components/Render/Login'

describe("Login Form Testing", () => {
    it("should show email validation on blur", async () => {
      const { getByLabelText, getByTestId } = render(<LoginRender />);
      const input = getByLabelText("Email");
      fireEvent.blur(input);
      await waitFor(() => {
        expect(getByTestId("emailError")).not.toBe(null);
        expect(getByTestId("emailError")).toHaveTextContent("An email address is required *");
      });
    });
    it("should show password validation on blur", async () => {
      const { getByLabelText, getByTestId } = render(<LoginRender />);
      const input = getByLabelText("Password");
      fireEvent.blur(input);
      await waitFor(() => {
        expect(getByTestId("passwordError")).not.toBe(null);
        expect(getByTestId("passwordError")).toHaveTextContent("A password is required *");
      });
    });
    it("should validate form fields on submit click", async () => {
      const { getByText, getByTestId } = render(<LoginRender />);  
      const button = getByText("Login");
      fireEvent.click(button);
      await waitFor(() => {
        expect(getByTestId("emailError")).toHaveTextContent("An email address is required *");
        expect(getByTestId("passwordError")).toHaveTextContent("A password is required *");
      });
    });
});