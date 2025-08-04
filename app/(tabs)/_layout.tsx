// _layout.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionsProvider from "../components/context/TransactionProvider";
import { UserProvider } from "../components/context/UserProvider";
import TabLayout from "../TabLayout";
import Theme from "../../interfaces/theme";

export default function Layout() {
  return (
//#4CB348
    <SafeAreaView style={{ flex: 1, backgroundColor:Theme.CFL_dark_green, }} edges={['top', 'bottom']}>
      <TabLayout />
    </SafeAreaView>
  );
}