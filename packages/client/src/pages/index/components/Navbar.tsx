import { DataType } from "@/client";
import { cn } from "@/utils";
import { useT } from "talkr";

export const Navbar = ({
  data,
  selected,
  setCategory,
}: {
  data?: DataType;
  selected: number;
  setCategory: (category: number) => void;
}) => {
  const { T } = useT();
  return (
    <div className="fixed bottom-0 w-full h-32 bg-gradient-to-t from-white to-white/0">
      <div className="absolute left-0 m-auto right-0 bottom-11 grid place-content-center">
        {data && (
          <div className="animate-in slide-in-from-bottom ease-in-out duration-300 fade-in fill-mode-backwards p-1 box-content bg-neutral-100 border border-neutral-200 rounded-full w-70 h-9 relative">
            <div className="w-full relative">
              <div
                className={cn(
                  "w-17 h-9 bg-neutral-900 rounded-full absolute transition-all ease-out duration-300",
                  `left-${selected}-4`
                )}
              ></div>
            </div>
            <div className="text-sm font-semibold absolute top-1 left-1 flex">
              {data.data.map((item, index) => (
                <div
                  onClick={() => setCategory(index)}
                  key={item.contentClass}
                  className={cn(
                    "transition-all ease-in leading-9 w-17 flex items-center justify-center",
                    { "text-white": selected === index }
                  )}
                >
                  {T(item.name)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
