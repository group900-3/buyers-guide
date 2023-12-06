import { CategoryType } from "@/client";
import { useEffect } from "react";
import { querySelector } from "@/utils";
import { Product } from "./Product";

export const Category = ({
  data,
  setOffsets,
}: {
  data: CategoryType;
  setOffsets: (offsets: number[]) => void;
}) => {
  useEffect(() => {
    setTimeout(() => {
      const q: Promise<number>[] = [];
      for (let i = 0; i < data.products.length; i++) {
        q.push(querySelector(`#view-${i}`).then((r) => r[0].top));
      }
      Promise.all(q).then((r) => {
        r[r.length - 1] = Infinity;
        setOffsets(r);
      });
    }, 500);
  }, [data.products.length, setOffsets]);
  return (
    <div className="animate-in fade-in duration-500 fill-mode-forwards">
      {data.products.map((product, index) => (
        <Product key={product.name} product={product} id={`view-${index}`} />
      ))}
    </div>
  );
};
