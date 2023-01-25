const puppeteer = require('puppeteer')
const fs = require('fs')

//GET SRC & ALT TEXT FROM ALL IMAGES ON PAGE
async function getImageData() {
  const browser = await puppeteer.launch({ executablePath: '/opt/homebrew/bin/chromium' });
  const page = await browser.newPage();
  await page.goto('https://www.webstacks.com/');

  const imageData = await page.$$eval('img', imgs => {
    return imgs.map(img => {
      return {src: img.src || "no src", alt: img.alt || "no alt text"}
    });
  });

  let output = '';
  for(let i = 0; i < imageData.length; i++) {
    output += imageData[i].src + ' : ' + imageData[i].alt + '\n';
  }

  fs.writeFileSync('image_data.txt', output);

  await browser.close();
}

getImageData()