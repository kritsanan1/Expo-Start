
// SEO Utilities and Google Search Console Integration
export class SEOManager {
  private static instance: SEOManager;
  private searchConsoleApiKey: string = '';

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  setSearchConsoleApiKey(apiKey: string) {
    this.searchConsoleApiKey = apiKey;
  }

  // Generate sitemap.xml content
  generateSitemap(baseUrl: string): string {
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/explore', priority: '0.9', changefreq: 'hourly' },
      { url: '/videos', priority: '0.9', changefreq: 'hourly' },
      { url: '/chat', priority: '0.8', changefreq: 'daily' },
      { url: '/profile', priority: '0.7', changefreq: 'weekly' },
      { url: '/auth', priority: '0.6', changefreq: 'monthly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  }

  // Generate robots.txt content
  generateRobotsTxt(baseUrl: string): string {
    return `User-agent: *
Allow: /
Allow: /explore
Allow: /videos
Disallow: /chat
Disallow: /profile
Disallow: /auth
Disallow: /api/

# Crawl-delay
Crawl-delay: 1

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Popular bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2`;
  }

  // Submit URL to Google Search Console
  async submitUrl(url: string, siteUrl: string): Promise<boolean> {
    if (!this.searchConsoleApiKey) {
      console.warn('Google Search Console API key not configured');
      return false;
    }

    try {
      const response = await fetch(
        `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect?key=${this.searchConsoleApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inspectionUrl: url,
            siteUrl: siteUrl
          })
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Failed to submit URL to Search Console:', error);
      return false;
    }
  }

  // Get Search Console analytics
  async getSearchAnalytics(siteUrl: string, startDate: string, endDate: string) {
    if (!this.searchConsoleApiKey) {
      console.warn('Google Search Console API key not configured');
      return null;
    }

    try {
      const response = await fetch(
        `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query?key=${this.searchConsoleApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions: ['query', 'page', 'country', 'device'],
            rowLimit: 1000
          })
        }
      );

      const data = await response.json();
      return data.rows || [];
    } catch (error) {
      console.error('Failed to fetch Search Console analytics:', error);
      return null;
    }
  }

  // Meta tags optimization
  optimizeMeta(page: string): Record<string, string> {
    const metaTags: Record<string, Record<string, string>> = {
      home: {
        title: "LoveMatch Thailand - Find Your Perfect Thai Match with Video Dating",
        description: "Connect with Thai singles through engaging video profiles and AI-powered matching. Join Thailand's premier dating app with social media integration.",
        keywords: "thai dating app, thailand dating, video dating, thai singles, matchmaking thailand"
      },
      explore: {
        title: "Discover Thai Singles - LoveMatch Thailand Dating App",
        description: "Explore thousands of Thai singles through our swipe-based interface. Find your perfect match with AI-powered recommendations.",
        keywords: "discover thai singles, swipe dating thailand, thai matchmaking, explore profiles"
      },
      videos: {
        title: "Video Profiles - Short Video Dating in Thailand",
        description: "Watch and create engaging video profiles. Connect through authentic video introductions with Thai singles.",
        keywords: "video dating thailand, video profiles, thai video dating, short video dating"
      },
      chat: {
        title: "Secure Messaging - Chat with Thai Matches",
        description: "Chat securely with your matches using end-to-end encryption. Build meaningful connections with Thai singles.",
        keywords: "secure chat thailand, dating messages, thai dating chat, encrypted messaging"
      }
    };

    return metaTags[page] || metaTags.home;
  }
}

// Structured Data Generator
export class StructuredDataGenerator {
  static generateWebApplication(appData: any) {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": appData.name,
      "description": appData.description,
      "url": appData.url,
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "iOS, Android, Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "THB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "1250"
      }
    };
  }

  static generateBreadcrumb(items: Array<{name: string, url: string}>) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  static generateOrganization(orgData: any) {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": orgData.name,
      "url": orgData.url,
      "logo": orgData.logo,
      "sameAs": orgData.socialLinks || [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Thai", "English"]
      }
    };
  }
}
