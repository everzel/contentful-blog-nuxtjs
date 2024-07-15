import type { PostCardData } from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";
import { describe, expect, it } from "vitest";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { useWsrvImage } from "@/composables/useWsrv.ts";
import { useFormatDate } from "@/composables/useDate.ts";
import { VueWrapper } from "@vue/test-utils";
import Card from "@/components/blog/list/Card.vue";

// Just for practice

interface UseRuntimeConfigMockParams {
  public: {
    appUrl: string;
    wsrvBaseUrl: string;
  };
}

const useRuntimeConfigMockParams: UseRuntimeConfigMockParams = {
  public: {
    appUrl: 'http://localhost:3000',
    wsrvBaseUrl: 'https://wsrv.nl',
  },
};

mockNuxtImport('useRuntimeConfig', () => {
  return (): object => useRuntimeConfigMockParams;
});

function mockPostCardData(): PostCardData {
  return {
    name: 'Post Name',
    slug: 'post-name',
    image_url: 'https://example.com/image.jpg',
    author: {
      name: 'Author Name',
      slug: 'author-name',
      image_url: 'https://example.com/image.jpg',
      position: 'Author Position',
    },
    description: 'Post Description',
    published_at: '2024-07-12',
  };
}

describe('Blog List Card Component', () => {
  it('should render blog list card component', async () => {
    const postCardData: PostCardData = mockPostCardData();

    const component: VueWrapper = await mountSuspended(Card, {
      props: {
        post: postCardData,
      },
    });

    const componentHtml: string = component.html();

    expect(componentHtml).toContain(`/blog/${postCardData.slug}`);

    expect(componentHtml).toContain(
      useWsrvImage({ imageUrl: postCardData.image_url, width: 380 })
    );
    expect(componentHtml).toContain(
      `${useWsrvImage({ imageUrl: postCardData.image_url, width: 760 })} 2x`
    );

    expect(componentHtml).toContain(
      useWsrvImage({ imageUrl: postCardData.author.image_url, width: 40 })
    );
    expect(componentHtml).toContain(
      `${useWsrvImage({ imageUrl: postCardData.author.image_url, width: 80 })} 2x`
    );

    expect(componentHtml).toContain(
      useFormatDate(postCardData.published_at)
    );

    expect(componentHtml).toContain(postCardData.name);
    expect(componentHtml).toContain(postCardData.description);
  });
});