import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'challenge_ionic_v2',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      '*.firebaseio.com',
      '*.firestore.googleapis.com',
      '*.firebase.com',
      '*.googleapis.com',
      'firestore.googleapis.com',
      'www.googleapis.com',
    ],
  },
  android: {
    webContentsDebuggingEnabled: true,
  },
};

export default config;
