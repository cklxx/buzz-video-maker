import { load, extract } from "@node-rs/jieba";
import { Pipeline } from "./pipline";
import { downloadFileAsync } from "./processor/downLoadFile";
import { imageSearch } from "./processor/imageSrc";
load();
const output = extract(
	"1. 昨天晚上年会，其中有一个互动环节，就是女同事在台上比划，男同事背对着屏幕猜。一女同事指了指自己的脸，逗逼男同事：“雀斑！”女同事摇了摇头，逗逼男同事：“痘痘！”女同事又摇了摇头，逗逼男同事：“麻子！”女同事还是摇了摇头，逗逼男同事：“肥肉！”主持人是在看不下去了，提示道：“一个字！”逗逼男同事笑道：“我知道了，是丑字。”男同事刚说完，女同事一阵流星拳打了上来，怒道：“说一个脸字要死麽！",
	7
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
