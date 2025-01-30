// IGNORE THIS FILE ITS ONLY USED TO VIEW THE APP THROUGH SNACK EXPO
import { ExpoRoot } from "expo-router";

export default function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}
