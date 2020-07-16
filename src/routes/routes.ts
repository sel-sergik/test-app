interface IRouteMap {
  [key: string]: IRoute;
}

interface IRoute {
  route: string;
}

export const routesMap: IRouteMap = {
  home: {
    route: '/'
  },
  tradeID: {
    route: '/trade/:tradeID'
  },
  login: {
    route: '/login'
  },
};
