import fs, { existsSync } from "fs";
import axios from "axios";
function downloadFileAsync(uri, dest) {
	if (!existsSync(dest)) {
		console.log(dest + " is not exists, create it");
	}

	// 确保dest路径存在
	axios({
		url: uri,
		method: "GET",
		responseType: "stream",
	}).then((res) => {
		res.data.pipe(fs.createWriteStream(dest));
	});
}

export { downloadFileAsync };
