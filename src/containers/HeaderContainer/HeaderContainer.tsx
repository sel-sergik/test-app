import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login } from 'components';
import { setActiveTradeAction, clearTradeDetailsAction } from 'actions';
import { routesMap } from '../../constants';
import './HeaderContainer.scss';

export const HeaderContainer: React.FC = () => {
  const dispatch = useDispatch();

  const logoClickHandler = () => {
    dispatch(setActiveTradeAction(null));
    dispatch(clearTradeDetailsAction());
  }

  return (
    <header>
      <div className='logo'>
        <h2><NavLink onClick={logoClickHandler} to={routesMap.Home.route}>Paxful</NavLink></h2>
      </div>
      <Login />
    </header>
  );
};
