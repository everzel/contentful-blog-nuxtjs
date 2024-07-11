<script setup lang="ts">
import type { Ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { AuthorPageData } from "@/services/contentful/types/controllers/blog/author/get-controller.d.ts";
import { useGetMeta } from "@/composables/useMeta.ts";
import BlogAuthorHeader from "@/components/blog/author/Header.vue";
import BlogAuthorPosts from "@/components/blog/author/Posts.vue";
import { getBlogAuthor } from "@/services/contentful/controllers/blog/author/get-controller.ts";

const route: RouteLocationNormalizedLoaded = useRoute();

const {
  data: authorData,
}: {
  data: Ref<AuthorPageData>;
} = await useAsyncData(
  `author-${route.params.slug}`,
  async (): Promise<AuthorPageData> => await getBlogAuthor(route.params.slug as string),
);

if (!authorData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}

const metaData: object = await useGetMeta(authorData.value.meta, route);

useHead(metaData);
</script>

<template>
  <NuxtLayout>
    <BlogAuthorHeader
      :author="authorData"
    />

    <BlogAuthorPosts
      :author-slug="authorData.slug"
    />
  </NuxtLayout>
</template>