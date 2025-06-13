// _layout.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionsProvider from "../components/context/TransactionProvider";
import { UserProvider } from "../components/context/UserProvider";
import TabLayout from "../TabLayout";
import Theme from "../../interfaces/theme";

export default function Layout() {
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor:'#4CB348', }} edges={['top', 'bottom']}>
      <TabLayout />
    </SafeAreaView>
  );
}