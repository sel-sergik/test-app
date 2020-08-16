import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { routesMap } from '@routes/routes';

import { currentUserSelector } from '@selectors/usersSelectors';

import {
  setActiveTradeAction,
  clearTradeDetailsAction,
} from '@store/actions/tradesActions';
import { setCurrentUserAction } from '@store/actions/loginActions';

import { removeCurrentUserFromStorage } from '@services/storageService';

import './Login.scss';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const logoutHandler = useCallback(() => {
    removeCurrentUserFromStorage();
    dispatch(setCurrentUserAction(null));
    dispatch(setActiveTradeAction(null));
    dispatch(clearTradeDetailsAction());
    history.push('/');
  }, [dispatch, history]);

  return (
    <div className="login-action">
      <NavLink
        to={currentUser ? routesMap.home.route : routesMap.login.route}
        onClick={currentUser ? logoutHandler : () => null}
      >
        {currentUser ? 'Logout' : 'Login'}
      </NavLink>
    </div>
  );
};
