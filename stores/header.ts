import type { ILink } from "@/services/contentful/controllers/link.ts";
import type { StoreDefinition } from "pinia";
import { defineStore } from "pinia";

export interface IHeaderState {
  links: ILink[];
}

export interface IHeaderGetters {
  getLinks: ILink[];
}

export interface IHeaderActions {
  setLinks: (links: ILink[]) => void;
}

export const useHeaderStore: StoreDefinition<
  'header-store',
  IHeaderState,
  IHeaderGetters,
  IHeaderActions
> = defineStore('header-store', {
  state: (): IHeaderState => ({
    links: [],
  }),

  getters: {
    getLinks: (state: IHeaderState): ILink[] => state.links,
  },

  actions: {
    setLinks(links: ILink[]): void {
      this.links = links;
    },
  },
});