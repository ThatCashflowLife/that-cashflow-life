// IGNORE THIS FILE ITS ONLY USED TO VIEW THE APP THROUGH SNACK EXPO
import { ExpoRoot } from 'expo-router';
import { Platform } from 'react-native';

// context type
type ContextFunction = {
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
};

// snack expo looks for this file & function, which will point it to our actual main app/index.tsx
export default function App() {
  const contextRequire = require as unknown as ContextFunction;
  
  const getContext = Platform.select({
    ios: () => contextRequire.context('./app'),
    android: () => contextRequire.context('./app'),
    web: () => contextRequire.context('./app'),
  });

  if (!getContext) return null;
  const ctx = getContext();

  return <ExpoRoot context={ctx} />;
}