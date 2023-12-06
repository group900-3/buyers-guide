import { PropsWithChildren } from "react";
import "@tarojs/taro/html.css";
import { Talkr } from "talkr";
import * as dayjs from "dayjs";
import { SWRConfig } from "swr";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import zh from "./zh.json";
import "./app.css";
import { getProvider } from "./utils";

dayjs.extend(customParseFormat);

function App({ children }: PropsWithChildren<any>) {
  return (
    <Talkr languages={{ zh }} defaultLanguage="zh">
      <SWRConfig value={{ provider: getProvider }}>{children}</SWRConfig>
    </Talkr>
  );
}

export default App;
