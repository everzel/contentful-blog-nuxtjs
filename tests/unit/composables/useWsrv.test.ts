import type { WsrvImageParams } from "@/composables/useWsrv.ts";
import { describe, expect, it } from "vitest";
import { useWsrvImage } from "@/composables/useWsrv.ts";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

interface UseRuntimeConfigMockParams {
  public: {
    appUrl: string;
    wsrvBaseUrl: string;
  };
}

const useRuntimeConfigMockParams: UseRuntimeConfigMockParams = {
  public: {
    appUrl: 'http://localhost:3000',
    wsrvBaseUrl: 'https://wsrv.nl',
  },
};

mockNuxtImport('useRuntimeConfig', () => {
  return (): object => useRuntimeConfigMockParams;
});

describe('useWsrv composition', () => {
  it('should return wsrv image\'s URL', () => {
    const queryParams: URLSearchParams = new URLSearchParams({
      w: '100',
      url: 'https://example.com/image.jpg',
      q: '100',
      output: 'webp',
    });

    const expectedResult: string = `${useRuntimeConfigMockParams.public.wsrvBaseUrl}?${queryParams.toString()}`;

    const params: WsrvImageParams = {
      imageUrl: 'https://example.com/image.jpg',
      width: 100,
    };

    expect(useWsrvImage(params)).toBe(expectedResult);
  });

  it('should return wsrv image\'s URL from local path', () => {
    const queryParams: URLSearchParams = new URLSearchParams({
      w: '100',
      url: `${useRuntimeConfigMockParams.public.appUrl}/image.jpg`,
      q: '100',
      output: 'webp',
    });

    const expectedResult: string = `${useRuntimeConfigMockParams.public.wsrvBaseUrl}?${queryParams.toString()}`;

    const params: WsrvImageParams = {
      imageUrl: '/image.jpg',
      width: 100,
    };

    expect(useWsrvImage(params)).toBe(expectedResult);
  });
});