import puppeteer from "puppeteer";

function searchUri(query: string) {
	return `https://tenor.com/search/${encodeURIComponent(query)}-gifs`;
}

async function imageSearch(query: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const url = searchUri(query);
	await page.goto(url);
	const srcList = await page.evaluate(() => {
       return [...document.querySelectorAll('img')].map(e=>e.src).filter(s=>/c.tenor.com/.test(s)) 
      });
	await browser.close();
	return srcList;
}

export { imageSearch };
