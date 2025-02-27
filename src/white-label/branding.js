const brands = {
  default: {
    name: 'DefaultApp',
    logo: require('../assets/default-logo.png'),
    colors: {
      primary: '#6200ee',
      secondary: '#03dac6',
    },
  },
  brandX: {
    name: 'BrandX',
    logo: require('../assets/brandx-logo.png'),
    colors: {
      primary: '#1E88E5',
      secondary: '#FFC107',
    },
  },
};

// export const loadBrandConfig = (brandKey = "default") => {
//   return brands[brandKey] || brands.default;
// };
