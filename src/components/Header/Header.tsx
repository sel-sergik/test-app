import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Login } from '@components/Header/Login/Login';

import { setActiveTradeAction, clearTradeDetailsAction } from '@store/actions/tradesActions';

import { routesMap } from '@routes/routes';

import './Header.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const logoClickHandler = useCallback(() => {
    dispatch(setActiveTradeAction(null));
    dispatch(clearTradeDetailsAction());
  }, []);

  return (
    <header>
      <div className="logo">
        <h2>
          <NavLink onClick={logoClickHandler} to={routesMap.home.route}>
            Paxful
          </NavLink>
        </h2>
      </div>
      <Login />
    </header>
  );
};
