export interface WsrvImageParams {
  imageUrl: string;
  width: number;
}

export const useWsrvImage = (params: WsrvImageParams): string => {
  const config: {
    appUrl: string;
    wsrvBaseUrl: string;
  } = useRuntimeConfig().public;

  let imageUrl = params.imageUrl;

  if (!/^(http:\/\/|https:\/\/)/.test(imageUrl)) {
    imageUrl = `${config.appUrl}${imageUrl}`;
  }

  const queryParams: URLSearchParams = new URLSearchParams({
    w: params.width.toString(),
    url: imageUrl,
    q: '100',
    output: 'webp',
  });

  return `${config.wsrvBaseUrl}?${queryParams.toString()}`;
};