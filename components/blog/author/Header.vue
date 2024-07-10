<script setup lang="ts">
import type { IBlogAuthorPage } from "@/services/contentful/controllers/blogAuthor.ts";
import TopographyHeading from "@/components/topography/Heading.vue";
import BackButton from "@/components/common/BackButton.vue";
import defaultBackground from "@/assets/images/author/author-bg.png";
import { weservImage } from "@/services/weserv.ts";

interface IProps {
  author: IBlogAuthorPage;
}

const props = defineProps<IProps>();

const backgroundUrl: string = props.author.background_url
  ? weservImage({ imageUrl: props.author.background_url, width: 1400 })
  : defaultBackground;
</script>

<template>
  <section class="relative pb-4 md:pb-8">
    <div class="w-full w-full max-w-7xl mx-auto px-8 lg:px-11 max-md:px-4 pt-6 z-20 relative">
      <BackButton>
        Back
      </BackButton>
    </div>

    <div class="mt-12">
      <div class="bg-black absolute top-0 left-0 z-0 h-60 w-full">
        <img
          :src="backgroundUrl"
          alt="cover-image"
          class="w-full opacity-90 w-full h-full object-cover"
        >
      </div>

      <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <img
            :src="weservImage({ imageUrl: author.image_url, width: 200 })"
            :srcset="`${weservImage({ imageUrl: author.image_url, width: 400 })} 2x`"
            :alt="author.name"
            class="border-4 border-solid border-white rounded-full w-[200px]"
          >
        </div>

        <div class="flex items-center md:items-start justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div class="block w-full md:w-1/2">

            <TopographyHeading
              class="mb-1 max-sm:text-center"
              :level="1"
            >
              {{ author.name }}
            </TopographyHeading>

            <p
              v-if="author.position?.length"
              class="font-normal text-base leading-7 text-gray-500  max-sm:text-center"
            >
              {{ author.position }}
            </p>
          </div>

          <div
            v-if="author.about?.length"
            v-html="author.about"
            class="w-full md:w-1/2 text-base text-gray-900 text-center md:text-left"
          >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>