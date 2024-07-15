<script setup lang="ts">
import type { Ref } from "vue";
import type { Store } from "pinia";
import type { NavigationItemData, NavigationLinkItemData } from "@/services/contentful/types/controllers/navigation/get-controller.d.ts";
import type { HeaderState, HeaderGetters, HeaderActions } from "@/stores/header.ts";
import Logo from "@/components/common/Logo.vue";
import { useHeaderStore } from "@/stores/header.ts";
import { getNavigationItem } from "@/services/contentful/controllers/navigation/get-controller.ts";

const isOpen: Ref<boolean> = ref(false);
const links: Ref<NavigationLinkItemData[]> = ref([]);

const store: Store<
  'header-store',
  HeaderState,
  HeaderGetters,
  HeaderActions
> = useHeaderStore();

if (store.getLinks.length) {
  links.value = store.links;
} else {
  const {
    data: navigationData,
  }: {
    data: Ref<NavigationItemData>;
  } = await useAsyncData(
    'header-navigation',
    async (): Promise<NavigationItemData> => await getNavigationItem('header'),
  );

  links.value = navigationData.value.links;
  store.setLinks(links.value);
}
</script>

<template>
  <nav class="w-full py-5 transition-all duration-500 bg-slate-50 border-b border-solid border-indigo-100">
    <div class="xl:px-28 lg:px-14 px-10">
      <div class="w-full flex justify-between flex-col lg:flex-row">
        <div class="flex justify-between lg:flex-row">
          <NuxtLink
            :to="{ name: 'index' }"
            class="flex items-center"
          >
            <Logo
              class="text-black w-[200px]"
            />
          </NuxtLink>

          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span class="sr-only">Open main menu</span>

            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div
          class="lg:flex lg:pl-11"
          :class="{ 'hidden': !isOpen }"
        >
          <ul class="lg:flex items-center flex-col mt-4 lg:mt-0 lg:flex-row">
            <li
              v-for="link in links"
              :key="link.url"
            >
              <NuxtLink
                :to="link.url"
                class="mb-2 px-3 block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>