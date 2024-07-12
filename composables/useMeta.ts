import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { MetaItemData } from "@/services/contentful/types/meta.d.ts";

export const useGetMeta = (meta: MetaItemData, route: RouteLocationNormalizedLoaded): object => {
  const config: {
    appUrl: string;
  } = useRuntimeConfig().public;

  const canonicalUrl: string = `${config.appUrl}${route.path}`;

  return {
    title: meta.title,

    meta: [
      { name: 'title', content: meta.title },
      { name: 'description', content: meta.description },
      { name: 'robots', content: meta.indexable ? 'index, follow' : 'noindex, nofollow' },

      // Open Graph
      { property: 'og:type', content: 'o' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.image_url },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      // Twitter
      { property: 'twitter:card', content: 't' },
      { property: 'twitter:url', content: canonicalUrl },
      { property: 'twitter:title', content: meta.title },
      { property: 'twitter:description', content: meta.description },
      { property: 'twitter:image', content: meta.image_url },
    ],

    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'image_src', href: meta.image_url },
    ],
  };
};