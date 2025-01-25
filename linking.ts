import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/'), 'cashflowlife://'],
  config: {
    screens: {
      Home: '',
      NotFound: '*', // Catch-all for unmatched routes
    },
  },
};