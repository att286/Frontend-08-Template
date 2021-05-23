const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto('https://example.com');
  // await page.screenshot({ path: 'example.png' });

  // await browser.close();

  await page.goto('http://localhost:8080/main.html');
  const a = await page.$('a')
  console.log(await a.asElement().boxModel())
})();