import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../app/components/context/UserProvider";
import TransactionsProvider from "../app/components/context/TransactionProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <TransactionsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TransactionsProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
