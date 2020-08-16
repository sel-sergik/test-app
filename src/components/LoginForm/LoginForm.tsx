import React, {
  useState,
  SyntheticEvent,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import { findUser } from '@services/usersService';
import { setCurrentUserToStorage } from '@services/storageService';

import { setCurrentUserAction } from '@store/actions/loginActions';

import './LoginForm.scss';

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = useCallback(
    () => email.length > 0 && password.length > 0,
    [email, password]
  );

  const formIsInvalid = useMemo(() => !validateForm(), [validateForm]);

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      const user = findUser(email, password);

      if (user) {
        dispatch(setCurrentUserAction(user));
        setCurrentUserToStorage(user);
        history.push('/');
      } else {
        setAuthFailed(true);
      }
    },
    [email, password, dispatch, history]
  );

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </FormGroup>
        <Button block disabled={formIsInvalid} type="submit">
          Login
        </Button>
        {authFailed && (
          <div className="login-form__error-message">
            The user was not found. Check entered data
          </div>
        )}
      </form>
    </div>
  );
};
