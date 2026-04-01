import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brokenmesh.habittracker',
  appName: 'Habit Tracker',
  webDir: 'publish/wwwroot',
  server: {
    androidScheme: 'https',
    cleartext: true,
    hostname: 'localhost',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 3000,
    },
  },
};

export default config;
