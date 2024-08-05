import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Theme {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light'
}

const DEFAULT_CONFIG = {
  theme: Theme.Light as Theme
};

export type AppConfig = typeof DEFAULT_CONFIG;

export type AppConfigStore = AppConfig & {
  reset: () => void;
  update: (updater: (config: AppConfig) => void) => void;
};

export const useAppConfig = create<AppConfigStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CONFIG,

      reset() {
        set(() => ({ ...DEFAULT_CONFIG }));
      },

      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      }
    }),
    { name: 'app-config' }
  )
);
