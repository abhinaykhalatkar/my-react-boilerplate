const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@UI': path.resolve(__dirname, 'src/Components/UI'),
      '@Util': path.resolve(__dirname, 'src/Components/Util'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@Store': path.resolve(__dirname, 'src/store'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Assets': path.resolve(__dirname, 'src/Assets'),
    },
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

      // Add your responsive-loader config
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
// in case of webp keep same
      oneOfRule.oneOf.unshift({
        test: /\.webp$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            sizes: [320, 640, 960, 1080],
            quality: 100, // Use quality 100 to preserve the original quality
            // Do not set the "format" option so that it remains WebP
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
