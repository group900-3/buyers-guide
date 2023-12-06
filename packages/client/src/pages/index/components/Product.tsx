import { ProductType } from "@/client";
import { cn } from "@/utils";
import { useT } from "talkr";
import { Group } from "./Group";

enum Status {
  "BUY_NOW" = "Buy Now",
  "CAUTION" = "Caution",
  "DONT_BUY" = "Don't Buy",
  "NEUTRAL" = "Neutral",
}

const statusToIconMap = {
  [Status.BUY_NOW]: "fa-check-circle",
  [Status.CAUTION]: "fa-exclamation-circle",
  [Status.DONT_BUY]: "fa-times-circle",
  [Status.NEUTRAL]: "fa-minus-circle",
};

const statusToColorMap = {
  [Status.BUY_NOW]: "text-i-blue",
  [Status.CAUTION]: "text-yellow-600",
  [Status.DONT_BUY]: "text-red-600",
  [Status.NEUTRAL]: "text-gray-600",
};

export const Product = ({
  id,
  product,
}: {
  id: string;
  product: ProductType;
}) => {
  const { T } = useT();
  const max = product.recentReleases.reduce((a, b) => {
    return Math.max(a, +b.daysSince);
  }, 0);
  return (
    <div id={id} className="pl-8 py-10 flex flex-col space-y-4">
      <div className="font-semibold text-xl">{product.name}</div>
      <div
        className={cn(
          "flex space-x-1 text-xs !mt-2 items-center",
          statusToColorMap[product.advice.conclusion]
        )}
      >
        <span
          className={cn(
            "fa fas text-base leading-none",
            statusToIconMap[product.advice.conclusion]
          )}
        />
        <span className="font-semibold">{T(product.advice.conclusion)}</span>
        <span className="text-[#1d1d1f]">{T(product.advice.note)}</span>
      </div>
      <Group
        title="现售款"
        max={max}
        items={[
          {
            date: product.lastRelease,
            daysSince: product.daysSinceLastRelease,
          },
        ]}
      />
      <Group
        title="平均更新周期"
        max={max}
        items={[{ daysSince: product.average }]}
      />
      <Group
        title="历史更新"
        max={max}
        items={product.recentReleases.map((i) => ({
          date: i.date,
          daysSince: i.daysSince,
        }))}
      />
    </div>
  );
};
