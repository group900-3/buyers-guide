import * as dayjs from "dayjs";
import { Progress } from "../../../components/Progress";

type Item = {
  daysSince?: string;
  date?: string;
};

export const Group = ({
  title,
  max,
  items,
}: {
  title: string;
  max: number;
  items: Item[];
}) => {
  return (
    <div>
      <div className="font-semibold mb-1 text-sm">{title}</div>
      <div className="flex flex-col space-y-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-end">
              {item.date && (
                <div className="text-xs">
                  {dayjs(item.date, "MMM YYYY").format("YYYY 年 M 月")}
                </div>
              )}
              {item.daysSince && (
                <div className="ml-auto font-semibold text-lg">
                  {+item.daysSince}
                </div>
              )}
            </div>
            <Progress v={Number(item.daysSince || max)} max={max} />
          </div>
        ))}
      </div>
    </div>
  );
};
