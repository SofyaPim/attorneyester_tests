// module.exports = ({ env }) => ({ plugins: [ require('autoprefixer')() ] })

module.exports = {
  plugins: [require('postcss-sort-media-queries')(), require('autoprefixer')],
};
