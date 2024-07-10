<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Ref } from "vue";
import type { IBlogPostPage } from "@/services/contentful/controllers/blogPost.ts";
import BlogPostHeader from "@/components/blog/post/Header.vue";
import OtherPosts from "@/components/blog/post/OtherPosts.vue";
import BlogPostContent from "@/components/blog/post/Content.vue";
import { getBlogPost } from "@/services/contentful/controllers/blogPost.ts";
import { useGetMeta } from "@/composables/useMeta.ts";

const route: RouteLocationNormalizedLoaded = useRoute();

const {
  data: postData,
}: {
  data: Ref<IBlogPostPage>;
} = await useAsyncData(
  `post-${route.params.slug}`,
  async (): Promise<IBlogPostPage> => await getBlogPost(route.params.slug as string),
);

if (!postData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}

const metaData: object = await useGetMeta(
  postData.value.meta,
  route,
);

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