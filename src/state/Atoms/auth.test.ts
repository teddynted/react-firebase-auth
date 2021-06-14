import { renderHook } from '@testing-library/react-hooks'
import { useRecoilValue, RecoilRoot } from 'recoil'
import { userState, isAuthenticating, isAuthenticated, authError } from './auth'

describe("User Authenticatin Atom", () => {
  it("user object should initialise to empty object", () => {
    const { result } = renderHook(() => useRecoilValue(userState), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual({});
  });
  it("isAuthenticating should initialise to false", () => {
    const { result } = renderHook(() => useRecoilValue(isAuthenticating), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual(false);
  });
  it("isAuthenticated should initialise to false", () => {
    const { result } = renderHook(() => useRecoilValue(isAuthenticated), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual(false);
  });
  it("authError should initialise to false", () => {
    const { result } = renderHook(() => useRecoilValue(authError), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual({});
  });
});