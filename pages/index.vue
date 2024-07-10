<script setup lang="ts">
import type { Ref } from "vue";
import type { IPage } from "@/services/contentful/controllers/page.ts";
import type { IBlogPostCard } from "@/services/contentful/controllers/blogPost.ts";
import BlogListCard from "@/components/blog/list/Card.vue";
import BlogCardListGrid from "@/components/blog/list/CardGrid.vue";
import TopographyHeading from "@/components/topography/Heading.vue";
import { getPage } from "@/services/contentful/controllers/page.ts";
import { getBlogPosts } from "@/services/contentful/controllers/blogPost.ts";

const {
  data: posts,
}: {
  data: Ref<IBlogPostCard[]>,
} = await useAsyncData(
  async (): Promise<IBlogPostCard[]> => await getBlogPosts(),
);

const {
  data: pageData,
}: {
  data: Ref<IPage>,
} = await useAsyncData(
  async (): Promise<IPage> => await getPage('homepage'),
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