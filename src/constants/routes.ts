interface IRouteMap {
  [key: string]: IRoute;
}
interface IRoute {
  route: string;
  exact: boolean;
}

export const routesMap: IRouteMap = {
  Home: {
    route: '/',
    exact: true
  },
  TraidID: {
    route: '/trade/:tradeID',
    exact: true
  },
  Login: {
    route: '/login',
    exact: true
  }
};
