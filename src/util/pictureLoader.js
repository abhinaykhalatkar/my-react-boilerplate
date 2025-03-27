// // pictureLoader.js
// const responsiveLoader = require('responsive-loader');
// const sharpAdapter = require('responsive-loader/sharp.js');

// // Centralized config inline (or require another .js file):
// const IMAGE_SIZES = [320, 640, 960, 1080];
// const IMAGE_QUALITY = 20;

// // Export a function that the loader-runner can consume:
// module.exports = function pictureLoader(content) {
//   const callback = this.async();

//   const sizes = IMAGE_SIZES;
//   const quality = IMAGE_QUALITY;
//   const namePattern = 'static/media/[name]-[width].[hash:8].[ext]';

//   const originalOptions = {
//     adapter: sharpAdapter,
//     sizes,
//     quality,
//     name: namePattern,
//     withoutEnlargement: true, // ensure that it only downsizes
//   };
  
//   const webpOptions = {
//     adapter: sharpAdapter,
//     sizes,
//     quality,
//     format: 'webp',
//     name: namePattern.replace('[ext]', 'webp'),
//     withoutEnlargement: true,
//   };

//   responsiveLoader.call(
//     { ...this, cacheable: () => {} },
//     content,
//     originalOptions,
//     (err, originalData) => {
//       if (err) return callback(err);
//       console.log('Original Data:', originalData);
//       responsiveLoader.call(
//         { ...this, cacheable: () => {} },
//         content,
//         webpOptions,
//         (err2, webpData) => {
//           if (err2) return callback(err2);
//           console.log('WebP Data:', webpData);
//           const output = {
//             original: originalData,
//             webp: webpData,
//           };
//           callback(null, `module.exports = ${JSON.stringify(output)}`);
//         }
//       );
//     }
//   );
// };
