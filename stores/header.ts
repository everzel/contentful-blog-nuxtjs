import type { StoreDefinition } from "pinia";
import type { NavigationLinkItemData } from "@/services/contentful/types/controllers/navigation/get-controller";
import { defineStore } from "pinia";

export interface HeaderState {
  links: NavigationLinkItemData[];
}

export interface HeaderGetters {
  getLinks: NavigationLinkItemData[];
}

export interface HeaderActions {
  setLinks: (links: NavigationLinkItemData[]) => void;
}

export const useHeaderStore: StoreDefinition<
  'header-store',
  HeaderState,
  HeaderGetters,
  HeaderActions
> = defineStore('header-store', {
  state: (): HeaderState => ({
    links: [],
  }),

  getters: {
    getLinks: (state: HeaderState): NavigationLinkItemData[] => state.links,
  },

  actions: {
    setLinks(links: NavigationLinkItemData[]): void {
      this.links = links;
    },
  },
});