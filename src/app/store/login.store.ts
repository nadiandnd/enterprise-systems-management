import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { AuthService } from '../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

type LoginState = {
  isLoading: boolean;
  error: string | null;
  user: { username: string } | null;
};

const initialState: LoginState = {
  isLoading: false,
  error: null,
  user: null,
};

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      initUserFromCookie() {
        const token = authService.getToken();
        const username = authService.getUser();
        if (token && username) {
          patchState(store, { user: { username } });
        }
      },
      login: rxMethod<{ username: string; password: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ username, password }) => {
            return authService.login(username, password).pipe(
              tapResponse({
                next: (user) => {
                  authService.setToken(user.token);
                  authService.setUser(user.username);
                  patchState(store, { user });
                  router.navigate(['/dashboard']);
                },
                error: (error: string) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),

      logout() {
        authService.removeToken();
        patchState(store, { user: null });
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.initUserFromCookie();
    },
  })
);
