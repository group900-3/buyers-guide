import { request } from "@tarojs/taro";
import { hc } from "hono/client";
import type { AppType } from "server/src/app";
import "cross-fetch/polyfill";
import type { InferResponseType } from "hono/client";

/**
 * Fetch to Taro.request
 */
const fetch = async (input: RequestInfo, init: RequestInit) => {
  const req = new Request(input, init);

  const res = await request({
    url: req.url,
    method: req.method as any,
    data: init.body,
    // dataType默认为json，会自动parse。设置为 other阻止这个默认行为
    dataType: "other",
    enableHttp2: true,
    enableCache: true,
  });
  return new Response(res.data, {
    headers: res.header,
    status: res.statusCode,
    statusText: res.errMsg,
  });
};

const client = hc<AppType>(process.env.TARO_APP_RPC_URL!, { fetch });

export const fetcher = async () => {
  const res = await client.data.$get();
  return await res.json();
};

export type DataType = InferResponseType<typeof client.data.$get>;
export type CategoryType = DataType["data"][number];
export type ProductType = CategoryType["products"][number];
