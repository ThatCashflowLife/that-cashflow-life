// IGNORE THIS FILE ITS ONLY USED TO VIEW THE APP THROUGH SNACK EXPO
import { ExpoRoot } from 'expo-router';
import { Platform } from 'react-native';

// type declaration for require.context
declare namespace NodeJS {
  interface Require {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => {
      keys(): string[];
      <T>(id: string): T;
      resolve(id: string): string;
      id: string;
    };
  }
}

export default function App() {
  const getContext = Platform.select({
    ios: () => require.context('./app'),
    android: () => require.context('./app'),
    web: () => require.context('./app'),
  });

  if (!getContext) return null;
  const ctx = getContext();

  return <ExpoRoot context={ctx} />;
}