import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  SelectorQuery,
  createSelectorQuery,
  getStorageSync,
  getSystemInfoSync,
  setStorageSync,
} from "@tarojs/taro";
import debounce from "lodash.debounce";

const { windowWidth } = getSystemInfoSync();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const px2rpx = (px: number) => (750 / windowWidth) * px;

export const querySelector = (selectorStr: string): Promise<any[]> => {
  return new Promise((resolve) => {
    const selector: SelectorQuery = createSelectorQuery();
    selector
      .select(selectorStr)
      .boundingClientRect()
      .exec((res: any[]) => {
        resolve(res);
      });
  });
};

class CacheMap<K, V> extends Map<K, V> {
  set(key: K, value: V) {
    // map构造函数传入iterable会set，此时save未赋值，所以在set中需要额外判断
    if (this.save) this.save();
    return super.set(key, value);
  }

  delete(key: K) {
    this.save();
    return super.delete(key);
  }

  save = debounce(
    () => {
      const appCache = JSON.stringify(Array.from(this.entries()));
      setStorageSync("app-cache", appCache);
    },
    100,
    { leading: false, trailing: true }
  );
}

export function getProvider() {
  const cache = JSON.parse(getStorageSync("app-cache") || "[]");
  const provider = new CacheMap<string, any>(cache);
  return provider;
}
