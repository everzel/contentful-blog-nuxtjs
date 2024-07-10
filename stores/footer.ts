import type { ISocialLink } from "@/services/contentful/controllers/socialLink.ts";
import type { StoreDefinition } from "pinia";
import { defineStore } from "pinia";

export interface IHeaderState {
  socialLinks: ISocialLink[];
}

export interface IHeaderGetters {
  getSocialLinks: ISocialLink[];
}

export interface IHeaderActions {
  setSocialLinks: (socialLinks: ISocialLink[]) => void;
}

export const useFooterStore: StoreDefinition<
  'footer-store',
  IHeaderState,
  IHeaderGetters,
  IHeaderActions
> = defineStore('footer-store', {
  state: (): IHeaderState => ({
    socialLinks: [],
  }),

  getters: {
    getSocialLinks: (state: IHeaderState): ISocialLink[] => state.socialLinks,
  },

  actions: {
    setSocialLinks(socialLinks: ISocialLink[]): void {
      this.socialLinks = socialLinks;
    },
  },
});