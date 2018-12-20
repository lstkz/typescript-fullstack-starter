import * as Rx from 'rx';
import { createEpic, createReducer } from 'typeless';
import { State } from 'src/types';
import { LoginState } from './types';
import { LoginActions } from './actions';
import {
  loginFormEpic,
  loginFormReducer,
  LoginFormActions,
} from './login-form';
import { GlobalActions } from '../global/actions';
import { RouterActions } from '../router/actions';

const login = (username: string, password: string) =>
  Rx.of(null).pipe(
    Rx.delay(2000),
    Rx.mergeMap(() => {
      if (username === 'user' && password == 'pass') {
        return Rx.of({ user: { id: 'a', username: 'user' }, token: '123' });
      }
      throw new Error('Invalid username or password');
    })
  );

// --- Epic ---
export const epic = createEpic<State>('Login')
  .attach(loginFormEpic)
  .on(LoginFormActions.setSubmitSucceeded, (_, { getState }) => {
    const { values } = getState().login.form;
    return Rx.concatObs(
      Rx.of(LoginActions.setLoading(true)),
      Rx.of(LoginActions.setError('')),
      login(values.username, values.password).pipe(
        Rx.mergeMap(({ user, token }) => {
          return [GlobalActions.loggedIn(user), RouterActions.push('/')];
        }),
        Rx.catchLog(e => Rx.of(LoginActions.setError(e.message)))
      ),
      Rx.of(LoginActions.setLoading(false))
    );
  });

// --- Reducer ---
const initialState: LoginState = {
  isLoading: false,
  error: '',
  form: undefined,
};

export const reducer = createReducer(initialState)
  .on(LoginActions.setLoading, (state, { isLoading }) => {
    state.isLoading = isLoading;
  })
  .on(LoginActions.setError, (state, { error }) => {
    state.error = error;
  })
  .attach('form', loginFormReducer);
