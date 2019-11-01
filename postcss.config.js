// eslint-disable-next-line import/no-extraneous-dependencies
const tailwindcss = require('tailwindcss');

module.exports = {
  // eslint-disable-next-line
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
