import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { findUser } from 'services';
import { setCurrentUserAction } from 'actions';
import './LoginContainer.scss';

export const LoginContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const user = findUser(email, password);

    if (user) {
      dispatch(setCurrentUserAction(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      history.push('/');
    } else {
      setAuthFailed(true);
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
        { authFailed && <div className='login-form__error-message'>The user was not found. Check entered data</div> }
      </form>
    </div>
  );
};
