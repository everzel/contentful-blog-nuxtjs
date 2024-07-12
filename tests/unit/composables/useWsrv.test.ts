import { Assertion, describe, expect, it } from "vitest";
import { useWsrvImage, WsrvImageParams } from "@/composables/useWsrv.ts";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

interface MocksParams {
  useRuntimeConfig: {
    public: {
      appUrl: string;
      wsrvBaseUrl: string;
    };
  };
}

const mocksParams: MocksParams = {
  useRuntimeConfig: {
    public: {
      appUrl: 'http://localhost:3000',
      wsrvBaseUrl: 'https://wsrv.nl',
    },
  },
};

mockNuxtImport('useRuntimeConfig', () => {
  return (): object => mocksParams.useRuntimeConfig;
});

describe('useWsrv composition', (): void => {
  it('should return wsrv image\'s URL', (): void => {
    const queryParams: URLSearchParams = new URLSearchParams({
      w: '100',
      url: 'https://example.com/image.jpg',
      q: '100',
      output: 'webp',
    });

    const expectedResult: string = `${mocksParams.useRuntimeConfig.public.wsrvBaseUrl}?${queryParams.toString()}`;

    const params: WsrvImageParams = {
      imageUrl: 'https://example.com/image.jpg',
      width: 100,
    };

    expect<Assertion>(useWsrvImage(params)).toBe(expectedResult);
  });
});