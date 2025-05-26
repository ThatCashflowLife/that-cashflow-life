import Profession from "../../../interfaces/Profession";
import allProfessions from "../../../data/Professions";
import Transaction from "../../../interfaces/Transaction";
import User, { Icon } from "../../../interfaces/User";
import formatTimestamp from "../../../utils/timeUtil";




/**
 * Get the icon name that matches the profession name,
 * and the library the icon comes from within expo/vector icons
 *
 * @param professionName - name of newly scanned profession
 * @returns an object with the icon name and library
 */
export const getIcon = (professionName: string): Icon => {
  const iconMapping: { [key: string]: Icon } = {
    "Airline Pilot": { name: "plane-departure", library: "FontAwesome6" },
    "Business Manager": { name: "user-tie", library: "FontAwesome6" },
    Doctor: { name: "user-doctor", library: "FontAwesome6" },
    Engineer: { name: "user-gear", library: "FontAwesome6" },
    Janitor: { name: "cleaning-services", library: "MaterialIcons" },
    Lawyer: { name: "law", library: "Octicons" },
    Nurse: { name: "user-nurse", library: "FontAwesome6" },
    "Police Officer": { name: "handcuffs", library: "FontAwesome6" },
    Secretary: { name: "old-phone", library: "Entypo" },
    Teacher: { name: "chalkboard-teacher", library: "FontAwesome5" },
    "Truck Driver": { name: "truck", library: "FontAwesome5" },
  };

  return (
    iconMapping[professionName] || {
      name: "questioncircle",
      library: "AntDesign",
    }
  );
};

/**
 *  populate fields on the user object from the incoming profession (for user defaults)
 * @param scannedProfession - scanned in profession object
 * @param currentUser - copy of current user object state
 * @returns a new User object with the scanned fields updated
 */
export const populateFirstProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const userInitialValues: User = {
    ...currentUser,
    profession: scannedProfession.name,
    income: scannedProfession.income,
    expenses: scannedProfession.expenses,
    Assets: scannedProfession.assets,
    Liabilities: scannedProfession.liabilities,
    professionIcon: getIcon(scannedProfession.name),
  };

  return userInitialValues;
};

/**
 * only populate profession name, icon and salary for all professions after the first
 * @param scannedProfession 
 * @param currentUser 
 * @returns user object w changed profession, salary and icon 
 */
export const populateLaterProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const changedProfessionValues: User = {
    ...currentUser,
    profession: scannedProfession.name,
    income: {
      ...currentUser.income,
      Salary: scannedProfession.income.Salary,
    },
    professionIcon: getIcon(scannedProfession.name),
  };

  return changedProfessionValues;
};

/**
 * Creates transaction for a new job
 * @param scannedProfession 
 * @returns transaction object
 */
export const createProfessionTransaction = (scannedProfession: Profession): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  const newJobTransaction: Transaction = {
    scanType: "Transaction",
    name: `New Job: ${scannedProfession.name}`,
    timestamp,
    type: "career",
    description: `Now employed as a ${scannedProfession.name}.`,
    amount: scannedProfession.income.Salary,
    fieldName: "Salary",
  };
  return newJobTransaction;
}
/**
 * Creates transaction for a new baby
 * @param scannedTransaction
 * @returns transaction object
 */
export const createBabyTransaction = (currentUser: User): Transaction => {

  const profession = allProfessions.find(
    (p) => p.name === currentUser.profession
  );

  const perChildExpense = profession?.expenses?.["Per Child Expense"]  || 0;

  const babyTransaction: Transaction = {
    scanType: "Transaction",
    name: "New Baby",
    timestamp: formatTimestamp(new Date().toISOString()),
    type: "expense",
    description: `Player had a child.`,
    amount: -perChildExpense, // dynamically calculated
    fieldName: "Children",
  };

  return babyTransaction;
};

/**
 * Increments the user's child count and updates the Children expense
 * based on the Per Child Expense defined in their profession data.
 *
 * @param currentUser - The current user object
 * @returns updated user object with incremented children and updated expenses
 */
export const addChildToUser = (currentUser: User): User => {
  const updatedChildren = currentUser.Children + 1;

  // Find matching profession data
  const professionData: Profession | undefined = allProfessions.find(
    (p) => p.name === currentUser.profession
  );

  // Default to 0 if not defined
  const perChildExpense = professionData?.expenses?.["Per Child Expense"] || 0;

  // Update user's children and child-related expense
  return {
    ...currentUser,
    Children: updatedChildren,
    expenses: {
      ...currentUser.expenses,
      Children: perChildExpense * updatedChildren,
    },
  };
};



export default populateFirstProfession;
