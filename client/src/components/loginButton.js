import { useAuth0 } from '@auth0/auth0-react';
const React = require("react");


function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button onClick={loginWithRedirect} className="nav-button primary-color">Log in</button>
  );
}
export default LoginButton;