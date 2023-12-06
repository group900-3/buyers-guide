import { cn, querySelector } from "@/utils";
import { ITouchEvent, View, Image } from "@tarojs/components";
import { vibrateShort } from "@tarojs/taro";
import { useEffect, useMemo, useState } from "react";
import { DataType } from "@/client";
import { assets, holder } from "../assertMap";

export const Indexes = ({
  data,
  selectedCategory,
  target,
  setTarget,
  setEnableScrollIntoView,
}: {
  data?: DataType;
  selectedCategory: number;
  target: number;
  setTarget: (index: number) => void;
  setEnableScrollIntoView: (enable: boolean) => void;
}) => {
  const [startTop, setStartTop] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const products = useMemo(
    () => data?.data[selectedCategory].products.map((p) => p.name) || [],
    [data?.data, selectedCategory]
  );
  useEffect(() => {
    setTimeout(
      () =>
        querySelector("#indexes").then((rect) => {
          const len = products.length;
          const menuHeight = rect[0].height + 24;
          setStartTop(rect[0].top);
          setItemHeight(Math.floor(menuHeight / len));
        }),
      500
    );
  }, [data, products]);

  const handleTouchMove = (event: ITouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const pageY = event.touches[0].pageY;
    const index = Math.floor((pageY - startTop) / itemHeight);
    if (index >= 0 && index <= products.length - 1 && target !== index) {
      setTarget(index);
      vibrateShort({ type: "medium" });
    }
  };

  if (!data) return null;
  return (
    <div className="fixed h-screen pr-2 top-0 right-0 flex flex-col justify-center pb-28 box-border">
      {data.data.map(
        (category, index) =>
          selectedCategory === index && (
            <View
              key={category.name}
              className="animate-in fade-in zoom-in-95 slide-in-from-right ease-in-out duration-500 fill-mode-forwards"
              id="indexes"
              onTouchStart={() => setEnableScrollIntoView(true)}
              onTouchEnd={() => setEnableScrollIntoView(false)}
              onTouchCancel={() => setEnableScrollIntoView(false)}
              onTouchMove={handleTouchMove}
            >
              {category.products.map((product, _index) => {
                const distance = Math.abs(target - _index);
                return (
                  <div
                    key={product.name}
                    className={cn(
                      "w-12 h-16 grid place-content-center duration-300 transition-all ease-in-out origin-right",
                      {
                        "scale-150": distance === 0,
                        "scale-125": distance === 1,
                        "scale-110": distance === 2,
                        "my-2": distance === 0,
                        "my-1": distance === 1,
                      }
                    )}
                  >
                    <Image
                      mode="aspectFit"
                      src={assets[product.name] || holder}
                      className="h-12 w-12 pointer-events-none"
                    />
                  </div>
                );
              })}
            </View>
          )
      )}
    </div>
  );
};
