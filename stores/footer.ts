import type { StoreDefinition } from "pinia";
import type { NavigationSocialLinkItemData } from "@/services/contentful/types/controllers/navigation/get-controller";
import { defineStore } from "pinia";

export interface HeaderState {
  socialLinks: NavigationSocialLinkItemData[];
}

export interface HeaderGetters {
  getSocialLinks: NavigationSocialLinkItemData[];
}

export interface HeaderActions {
  setSocialLinks: (socialLinks: NavigationSocialLinkItemData[]) => void;
}

export const useFooterStore: StoreDefinition<
  'footer-store',
  HeaderState,
  HeaderGetters,
  HeaderActions
> = defineStore('footer-store', {
  state: (): HeaderState => ({
    socialLinks: [],
  }),

  getters: {
    getSocialLinks: (state: HeaderState): NavigationSocialLinkItemData[] => state.socialLinks,
  },

  actions: {
    setSocialLinks(socialLinks: NavigationSocialLinkItemData[]): void {
      this.socialLinks = socialLinks;
    },
  },
});