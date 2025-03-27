module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (!oneOfRule) return webpackConfig;

      oneOfRule.oneOf.unshift({
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            sizes: [320, 640, 960, 1080],
            quality: 20,
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
