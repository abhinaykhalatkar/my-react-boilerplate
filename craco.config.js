module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (!oneOfRule) return webpackConfig;

      // Override CRA's outdated sass-loader with the latest version
      oneOfRule.oneOf.forEach((rule) => {
        if (rule.use) {
          rule.use.forEach((loader) => {
            if (loader.loader && loader.loader.includes('sass-loader')) {
              loader.loader = require.resolve('sass-loader');
              loader.options = {
                sourceMap: true,
                implementation: require('sass'),
              };
            }
          });
        }
      });

      // Existing responsive-loader config
      oneOfRule.oneOf.unshift({
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            sizes: [320, 640, 960, 1080],
            quality: 80,
            format: 'webp',
            name: 'static/media/[name]-[width].[hash:8].[ext]',
            esModule: false,
            withoutEnlargement: true,
          },
        },
      });

      return webpackConfig;
    },
  },
};
