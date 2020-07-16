// eslint-disable-next-line import/no-cycle
import { history } from '@store/store';
import createRootReducer from '@store/rootReducer';

const rootReducer = createRootReducer(history);

export type AppState = ReturnType<typeof rootReducer>;
