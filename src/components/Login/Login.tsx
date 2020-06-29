import React, { SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { routesMap } from '../../constants';
import { currentUserSelector } from 'selectors';
import { setCurrentUserAction, setActiveTradeAction, clearTradeDetailsAction } from 'actions';
import { IUser } from 'interfaces';
import './Login.scss';

export const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser: IUser = useSelector(currentUserSelector);

  const logoutHandler = (event: SyntheticEvent) => {
    localStorage.removeItem('currentUser');
    dispatch(setCurrentUserAction(null));
    dispatch(setActiveTradeAction(null));
    dispatch(clearTradeDetailsAction());
    history.push(`/`);
  }

  return (
    <div className='login-action'>
      { currentUser ? <NavLink to={routesMap.Home.route} onClick={logoutHandler}>Logout</NavLink> : <NavLink to={routesMap.Login.route}>Login</NavLink> }
    </div>
  );
};