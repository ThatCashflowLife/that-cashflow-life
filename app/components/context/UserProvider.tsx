import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import blankUser from "../../../data/testData/blankUser";
import User from "../../../interfaces/User";
import addValuesTogether from "../../../utils/additionUtil";

// define UserContext type
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// create the user context
const UserContext = createContext<UserContextType>({
  user: blankUser,
  setUser: () => {},
});

// export the user context
export function useUser() {
  return useContext(UserContext);
}

export const recalculateTotals = (user: User): User => {
  const passiveIncome = user.income?.["Passive Income"] || {};
  const activeIncome = user.income?.["Salary"] || 0;

  // Sum up all property mortgages
  const realEstate = user.Assets?.Investments?.RealEstate || [];
  const totalMortgages = realEstate.reduce((sum, property) => sum + (property.Mortgage || 0), 0);

  // Total assets
  const cashAssets = {
    ...user.Assets,
    Investments: undefined
  };
  const totalAssetValue =
    addValuesTogether(cashAssets || {}) +
    realEstate.reduce((sum, p) => sum + (p["Purchase Price"] || 0), 0);

  const totalIncome = addValuesTogether(passiveIncome) + activeIncome;
  const totalExpenses = addValuesTogether(user.expenses || {});
  const totalLiabilities = addValuesTogether(user.Liabilities || {}) + totalMortgages;

  return {
    ...user,
    totalIncome,
    totalExpenses,
    totalLiabilities,
    totalAssets: totalAssetValue,
    netWorth: totalAssetValue - totalLiabilities,
  };
};

// create user provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(blankUser);

  // Load user when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(recalculateTotals(JSON.parse(savedUser)));

        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // Save user to storage whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };
    saveUser();
  }, [user]);
  
  


  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (updater) => {
          // allow both functional and object-based updates
          setUser((prev) => {
            const nextUser = typeof updater === "function" ? updater(prev) : updater;
            return recalculateTotals(nextUser);
          });
        },
      }}
    >
      {children}
    </UserContext.Provider>

  );
};
export default UserProvider;
