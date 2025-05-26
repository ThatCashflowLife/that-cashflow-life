import { ConfigContext, ExpoConfig } from "expo/config";

const defineConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "CashFlow Life",
  slug: "cashflow-life",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./app/assets/icons/That-Cashflow-LIFE.png",
  scheme: "cashflowlife",
  newArchEnabled: true,
  splash: {
    image: "./app/assets/icons/That-Cashflow-LIFE.png",
    resizeMode: "cover",
    backgroundColor: "#121212",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.thatcashflowlife.cashflowlife",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./app/assets/icons/That-Cashflow-LIFE.png",
      backgroundColor: "#121212",
    },
    package: "com.thatcashflowlife.cashflowlife",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./app/assets/icons/That-Cashflow-LIFE.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission: "Allow CashFlow Life to access your camera?",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "95ad9dd6-82ea-4256-902e-84b22b8dac98",
    },
  },
  updates: {
    url: "https://u.expo.dev/95ad9dd6-82ea-4256-902e-84b22b8dac98",
  },
  owner: "thatcashflowlife",
  runtimeVersion: "1.0.0",
});

export default defineConfig;
