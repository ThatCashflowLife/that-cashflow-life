/*
 * expo-router looks for your tab files within the Tabs directory
 * this file gives expo-router something to find
 *  and points to the correct component
 */
import FinancialStatement from "../components/UserFinances/FinancialStatement";
import { useUser } from "./_layout";

export default function FinancesTab() {
  const user = useUser();

  return <FinancialStatement user={user} />;
}
