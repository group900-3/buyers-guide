import { Navbar } from "@/pages/index/components/Navbar";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  setNavigationBarTitle,
  useShareAppMessage,
  useShareTimeline,
} from "@tarojs/taro";
import {
  BaseEventOrigFunction,
  ScrollView,
  ScrollViewProps,
} from "@tarojs/components";
import { fetcher } from "@/client";
import { ProductItemSkeleton } from "@/components/ProductItemSkeleton";
import { px2rpx } from "@/utils";
import { Indexes } from "./components/Indexes";
import { Category } from "./components/Category";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showNavigationBarTitle, setShowNavigationBarTitle] = useState(false);
  const [target, setTarget] = useState<number>(0);
  const [enableScrollIntoView, setEnableScrollIntoView] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);

  const { data, isLoading } = useSWR("data", fetcher);

  useShareAppMessage(() => ({
    title: "现在应该买 iPhone 吗？",
  }));
  useShareTimeline(() => ({ title: "现在应该买 iPhone 吗？" }));

  useEffect(() => {
    //HACK: 微信小程序需要设置不同的 scrollTop 才能触发 onScroll
    setScrollTop(Math.random());
    setTarget(0);
    setTimeout(() => {
      setScrollTop(0);
    });
    setNavigationBarTitle({
      title: "",
    });
  }, [selectedCategory]);

  useEffect(() => {
    setNavigationBarTitle({
      title: showNavigationBarTitle ? "选果助手" : "",
    });
  }, [showNavigationBarTitle]);

  const handleScroll: BaseEventOrigFunction<ScrollViewProps.onScrollDetail> = (
    event
  ) => {
    setShowNavigationBarTitle(px2rpx(event.detail.scrollTop) > 120);
    // 如果启用了 scrollIntoView（这代表正在拖拽 indexes），不要执行下面的逻辑
    if (enableScrollIntoView) return;
    // 计算当前滚动位置对应的索引，与 indexes 联动
    const index = offsets.findIndex(
      (offset) => offset > event.detail.scrollTop
    );
    if (index === -1) {
      setTarget(0);
      return;
    }
    if (target !== index) setTarget(index);
  };
  return (
    <>
      <ScrollView
        scrollY={!!data}
        className="h-screen"
        scrollIntoView={enableScrollIntoView ? `view-${target}` : undefined}
        onScroll={handleScroll}
        scrollTop={scrollTop}
        enableBackToTop
      >
        <div className="h-14 flex justify-center">
          <div className="w-14 h-14 bg-contain bg-logo" />
        </div>
        <div className="pr-24 pb-24 flex flex-col divide-y divide-neutral-100">
          {data && (
            <div className="pb-12">
              {data?.data.map(
                (category, index) =>
                  selectedCategory === index && (
                    <Category
                      setOffsets={setOffsets}
                      key={category.name}
                      data={category}
                    />
                  )
              )}
              <div className="text-neutral-400 text-xs text-center absolute w-full">
                GROUP900 experience of MacRumors.
              </div>
            </div>
          )}
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <ProductItemSkeleton key={i} />
            ))}
        </div>
      </ScrollView>
      <Navbar
        data={data}
        selected={selectedCategory}
        setCategory={setSelectedCategory}
      />
      <Indexes
        data={data}
        selectedCategory={selectedCategory}
        target={target}
        setTarget={setTarget}
        setEnableScrollIntoView={setEnableScrollIntoView}
      />
    </>
  );
}
