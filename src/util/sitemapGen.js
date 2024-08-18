const fs = require('fs');

const hostname = 'https://www.ipa-pflegedienst.de';
const urls = [
  { url: '/', changefreq: 'monthly', priority: 1 },
  { url: '/Ambulante-pflege', changefreq: 'monthly', priority: 0.8 },
  { url: '/Datenschutz', changefreq: 'monthly', priority: 0.8 },
  { url: '/Impressum', changefreq: 'monthly', priority: 0.8 },
  { url: '/Intensivpflege', changefreq: 'monthly', priority: 0.8 },
  { url: '/Palliativpflege', changefreq: 'monthly', priority: 0.8 },
  { url: '/Pflegeberatung', changefreq: 'monthly', priority: 0.8 },
  { url: '/Pflegeleitbild', changefreq: 'monthly', priority: 0.8 },
  { url: '/Team', changefreq: 'monthly', priority: 0.8 },
  { url: '/JobsAusbildung/Ausbildung', changefreq: 'monthly', priority: 0.8 },
  { url: '/JobsAusbildung/Pflegefachassistenten', changefreq: 'monthly', priority: 0.8 },
  { url: '/JobsAusbildung/Pflegefachmann', changefreq: 'monthly', priority: 0.8 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `<url><loc>${hostname}${url.url}</loc><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated!');
