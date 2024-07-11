<script setup lang="ts">
import type { PostCardData } from "@/services/contentful/types/controllers/blog/post/list-controller.d.ts";
import type { Ref } from "vue";
import type { PageItemData } from "@/services/contentful/types/controllers/page/get-controller.d.ts";
import BlogListCard from "@/components/blog/list/Card.vue";
import BlogCardListGrid from "@/components/blog/list/CardGrid.vue";
import TopographyHeading from "@/components/topography/Heading.vue";
import { getBlogPosts } from "@/services/contentful/controllers/blog/post/list-controller.ts";
import { getPage } from "@/services/contentful/controllers/page/get-controller.ts";

const {
  data: posts,
}: {
  data: Ref<PostCardData[]>,
} = await useAsyncData(
  async (): Promise<PostCardData[]> => await getBlogPosts(),
);

const {
  data: pageData,
}: {
  data: Ref<PageItemData>,
} = await useAsyncData(
  async (): Promise<PageItemData> => await getPage('homepage'),
);

const metaData: object = await useGetMeta(
  pageData.value.meta,
  useRoute(),
);

await useHead(metaData);
</script>

<template>
  <NuxtLayout>
    <section class="py-8 md:py-20">
      <TopographyHeading
        :level="2"
        tag="span"
        class="mb-6 md:mb-12 text-center"
      >
        Latest posts
      </TopographyHeading>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlogCardListGrid>
          <BlogListCard
            v-for="post in posts"
            :post="post"
            :key="post.slug"
          />
        </BlogCardListGrid>
      </div>
    </section>
  </NuxtLayout>
</template>