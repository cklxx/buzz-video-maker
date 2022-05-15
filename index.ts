import { load, extract } from "@node-rs/jieba";
import { Pipeline } from "./pipline";
import { downloadFileAsync } from "./processor/downLoadFile";
import { imageSearch } from "./processor/imageSrc";
load();
const output = extract(
	"今天纽约的天气真好啊，京华大酒店的张尧经理吃了一只北京烤鸭。后天纽约的天气不好，昨天纽约的天气也不好，北京烤鸭真好吃",
	5
);
function process(key) {
	const p = new Pipeline(
		{ query: key },
		async (t) => {
			const src = await imageSearch(t.query);
			return src;
		},
		(src) => {
			src.forEach((src, index) => {
				downloadFileAsync(src, "output/" + key + index + ".gif");
			});
			return src;
		}
	);
	p.run();
}
output.map((e) => e.keyword).forEach(process);
console.log(output);
