// `usePageContext` allows us to access `pageContext` in any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { inject } from 'vue'
import type { App, InjectionKey } from 'vue'
import { PageContext } from './types'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import localForage from "localforage";
import debounce from 'debounce';

export { usePageContext }
export { setPageContext }

const key: InjectionKey<PageContext> = Symbol()

function usePageContext() {
  const pageContext = inject(key)
  if (!pageContext) throw new Error('setPageContext() not called in parent')
  return pageContext
}

let stateDebouncer = {}

function setPageContext(app: App, pageContext: PageContext) {
  app.provide(key, pageContext)

  const makeLocalForgeReady = () => {
    localForage.config({
      driver: localForage.INDEXEDDB, // This force IndexedDB as the driver
    });
  };
  let localForgeReady = false;
  const pinia = createPinia()
  const installPersistedStatePlugin = createPersistedStatePlugin({
    storage: {
      getItem: async (key) => {
        if (!localForgeReady) {
          makeLocalForgeReady();
        }
        const x = await localForage.getItem(key);
        return x
      },
      setItem: async (key, value) => {
        if (!localForgeReady) {
          makeLocalForgeReady();
        }
        if (!stateDebouncer[key]) {
          stateDebouncer[key] = {
            key,
            value,
            debouncer: debounce(async () => {
              const x = await localForage.setItem(stateDebouncer[key].key, stateDebouncer[key].value)
              console.log('oops');
            }, 500),
          }
        }
        else {
          stateDebouncer[key].value = value;
        }
        const x = await stateDebouncer[key].debouncer();
        return x;
      },
      removeItem: async (key) => {
        if (!localForgeReady) {
          makeLocalForgeReady();
        }
        const x = await localForage.removeItem(key)
        return x;
      },
    },
  });
  pinia.use((context) => installPersistedStatePlugin(context))

  app.use(pinia);
}
