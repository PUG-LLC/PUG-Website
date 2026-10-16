import type { Work, NewsItem, Member } from "./types";
import works0 from "../../../content/work/p-akagi.json";
import works1 from "../../../content/work/p-gosinju.json";
import works2 from "../../../content/work/p-klee.json";
import works3 from "../../../content/work/p-tenku.json";
import news0 from "../../../content/news/1.json";
import news1 from "../../../content/news/2.json";
import members0 from "../../../content/members/cotominaka.json";
import members1 from "../../../content/members/meiiida.json";
import members2 from "../../../content/members/nanaseshigeta.json";
import members3 from "../../../content/members/ryojigondo.json";
import members4 from "../../../content/members/shouhiide.json";
import members5 from "../../../content/members/taichisuwa.json";

export const works: Work[] = [works0, works1, works2, works3].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity));
export const news: NewsItem[] = [news0, news1].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity));
export const members: Member[] = [members0, members1, members2, members3, members4, members5].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity));
