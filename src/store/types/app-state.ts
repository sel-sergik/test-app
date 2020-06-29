import createRootReducer from '../root-reducer';
import { history } from '../store';

const rootReducer = createRootReducer(history);

export type AppState = ReturnType<typeof rootReducer>;
