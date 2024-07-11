<script setup lang="ts">
import type { Ref } from "vue";
import type { ComponentProps as ISocialIconProps } from "@/components/common/SocialIcon.vue";
import type { Store } from "pinia";
import type { HeaderState, HeaderGetters, HeaderActions } from "@/stores/footer.ts";
import type { NavigationItemData, NavigationSocialLinkItemData } from "@/services/contentful/types/controllers/navigation/get-controller.d.ts";
import Logo from "@/components/common/Logo.vue";
import SocialIcon from "@/components/common/SocialIcon.vue";
import { useFooterStore } from "@/stores/footer.ts";
import { getNavigationItem } from "@/services/contentful/controllers/navigation/get-controller.ts";

const socialLinks: Ref<NavigationSocialLinkItemData[]> = ref([]);

const store: Store<
  'footer-store',
  HeaderState,
  HeaderGetters,
  HeaderActions
> = useFooterStore();

if (store.getSocialLinks.length) {
  socialLinks.value = store.socialLinks;
} else {
  const {
    data: navigationData,
  }: {
    data: Ref<NavigationItemData>;
  } = await useAsyncData(
    'footer-navigation',
    async (): Promise<NavigationItemData> => await getNavigationItem('footer')
  );

  socialLinks.value = navigationData.value.socialLinks;
  store.setSocialLinks(socialLinks.value);
}

const getSocialIconType = (type: NavigationSocialLinkItemData['type']): string | null => {
  switch (type) {
    case 'Twitter (X)':
      return 'twitter';

    case 'Instagram':
      return 'instagram';

    default:
      return null;
  }
};
</script>

<template>
  <footer class="w-full bg-slate-50 border-t border-solid border-indigo-100">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="py-7">
        <div class="flex items-center justify-between">
          <NuxtLink
            :to="{ name: 'index' }"
            class="flex items-center"
          >
            <Logo
              class="text-black w-[200px]"
            />
          </NuxtLink>

          <div
            v-if="socialLinks.length"
            class="flex space-x-4 sm:justify-center"
          >
            <template
              v-for="socialLink in socialLinks"
            >
              <SocialIcon
                v-if="getSocialIconType(socialLink.type)"
                :href="socialLink.url"
                :type="getSocialIconType(socialLink.type) as ISocialIconProps['type']"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>