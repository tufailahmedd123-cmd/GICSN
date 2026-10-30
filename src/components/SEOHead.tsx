import React, { useEffect } from 'react';
import { ACADEMY_CONFIG } from '../data/academyConfig';

interface SEOHeadProps {
  title: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | ${ACADEMY_CONFIG.name}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Add LocalBusiness / EducationalOrganization Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": ACADEMY_CONFIG.name,
      "slogan": ACADEMY_CONFIG.slogan,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": ACADEMY_CONFIG.location.city,
        "addressRegion": ACADEMY_CONFIG.location.province,
        "addressCountry": "PK"
      },
      "telephone": ACADEMY_CONFIG.contact.primaryPhone,
      "openingHours": "Mo-Fr 09:00-21:00"
    };

    let scriptTag = document.getElementById('jsonld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [title, description]);

  return null;
};
