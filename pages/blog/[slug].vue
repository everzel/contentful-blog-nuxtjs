<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Ref } from "vue";
import type { PostPageData } from "@/services/contentful/types/controllers/blog/post/get-controller.d.ts";
import BlogPostHeader from "@/components/blog/post/Header.vue";
import OtherPosts from "@/components/blog/post/OtherPosts.vue";
import BlogPostContent from "@/components/blog/post/Content.vue";
import { useGetMeta } from "@/composables/useMeta.ts";
import { getBlogPost } from "@/services/contentful/controllers/blog/post/get-controller.ts";

const route: RouteLocationNormalizedLoaded = useRoute();

const {
  data: postData,
}: {
  data: Ref<PostPageData>;
} = await useAsyncData(
  `post-${route.params.slug}`,
  async (): Promise<PostPageData> => await getBlogPost(route.params.slug as string),
);

if (!postData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}

const metaData: object = await useGetMeta(postData.value.meta, route);

useHead(metaData);
</script>

<template>
  <NuxtLayout>
    <BlogPostHeader
      :post="postData"
    />

    <BlogPostContent
      :content="postData.content"
    />

    <OtherPosts
      :excepted-slugs="[postData.slug]"
    />
  </NuxtLayout>
</template>