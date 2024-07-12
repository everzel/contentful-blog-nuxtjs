import type { MetaItemData } from "@/services/contentful/types/meta.d.ts";
import { describe, expect, it } from "vitest";
import { useGetMeta } from "@/composables/useMeta.ts";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

interface MocksParams {
  useRoute: {
    path: string;
  };

  useRuntimeConfig: {
    public: {
      appUrl: string;
    };
  };
}

const mocksParams: MocksParams = {
  useRoute: {
    path: '/page',
  },

  useRuntimeConfig: {
    public: {
      appUrl: 'http://localhost:3000',
    },
  },
};

mockNuxtImport('useRoute', () => {
  return (): object => mocksParams.useRoute;
});

mockNuxtImport('useRuntimeConfig', () => {
  return (): object => mocksParams.useRuntimeConfig;
});

function makeMetaItemData(): MetaItemData {
  return {
    title: 'Page title',
    description: 'Page description',
    image_url: 'http://localhost:3000/preview.png',
    indexable: true,
  };
}

describe('useMeta composition', (): void => {
  it('should return meta data for Nuxt\'s useHead function', (): void => {
    const meta: MetaItemData = makeMetaItemData();

    const canonicalUrl = `${mocksParams.useRuntimeConfig.public.appUrl}${mocksParams.useRoute.path}`;

    expect(useGetMeta(meta, useRoute()))
      .toStrictEqual({
        title: meta.title,

        meta: [
          { name: 'title', content: meta.title },
          { name: 'description', content: meta.description },
          { name: 'robots', content: meta.indexable ? 'index, follow' : 'noindex, nofollow' },

          { property: 'og:type', content: 'o' },
          { property: 'og:url', content: canonicalUrl },
          { property: 'og:title', content: meta.title },
          { property: 'og:description', content: meta.description },
          { property: 'og:image', content: meta.image_url },
          { property: 'og:image:type', content: 'image/png' },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },

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
      });
  });
});