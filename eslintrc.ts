import type { ESLint } from "eslint";

const config: ESLint.ConfigData = {
  // Marks this as the root ESLint config file to prevent looking for more configs up the directory tree
  root: true,

  // Use TypeScript parser instead of default JavaScript parser
  parser: "@typescript-eslint/parser",

  // Extend from popular configurations for React Native/TypeScript best practices
  extends: [
    // Expo's universal config includes essential rules for React Native development
    "universe/native",
    // Essential TypeScript rules
    "plugin:@typescript-eslint/recommended",
    // React recommended rules for catching common mistakes
    "plugin:react/recommended",
    // React Hooks rules to ensure proper hooks usage
    "plugin:react-hooks/recommended",
  ],

  // Configure how ESLint processes our code
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
    ecmaVersion: "latest", // Use latest ECMAScript features
    sourceType: "module", // Allows use of imports
    project: "./tsconfig.json", // Link to your TypeScript config
  },

  // Additional plugins for specific rule sets
  plugins: [
    "@typescript-eslint", // TypeScript-specific linting rules
    "react", // React-specific linting rules
    "react-hooks", // React hooks-specific linting rules
    "react-native", // React Native-specific linting rules
  ],

  // Custom rule configuration
  rules: {
    // Enforce consistent import ordering
    "import/order": [
      "error",
      {
        // Group imports by type and enforce order
        "groups": [
          ["builtin", "external"], // Node.js builtins and npm packages
          "internal", // Your app's internal imports
          ["parent", "sibling", "index"], // Relative imports
        ],
        // Add blank lines between import groups
        "newlines-between": "always",
        // Sort imports alphabetically within groups
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true,
        },
      },
    ],

    // Modern React doesn't require React to be in scope for JSX
    "react/react-in-jsx-scope": "off",

    // Critical rules for React Hooks
    "react-hooks/rules-of-hooks": "error", // Enforce Hooks rules
    "react-hooks/exhaustive-deps": "warn", // Check effect dependencies

    // Prevent using @ alias imports to maintain compatibility with Expo Snack
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["@/*"],
            "message": "Please use relative imports instead of @ alias",
          },
        ],
      },
    ],
  },

  // Additional settings for plugins
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },

  // Files and directories to ignore
  ignorePatterns: [
    "node_modules/", // Third-party packages
    "babel.config.js", // Build configuration
    "metro.config.js", // React Native bundler config
    ".expo/", // Expo-specific files
  ],
};

export default config;