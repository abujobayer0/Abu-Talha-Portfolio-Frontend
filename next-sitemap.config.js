module.exports = {
  siteUrl: 'https://www.apexpropdesign.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  sitemapIndexFile: 'sitemap-index.xml',
  sitemapFilename: 'sitemap-[prefix]-[index].xml',
  sitemapDirectories: [
    {
      url: 'https://www.apexpropdesign.com',
      changefreq: 'daily',
      priority: 1,
    },
  ],
};
