const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

const auth = require("./auth");
const { createWebsocketMessageListener } = require("./message");
const { downloadVideo, parseMessage } = require("./course");

dotenv.config();

async function main() {
  const browser = await puppeteer.launch(
    {
      headless: false,
      defaultViewport: { width: 1920, height: 1080 }
    }
  );
  const page = await browser.newPage();
  createWebsocketMessageListener(page).register((message) => {
    const video = parseMessage(message);
    if (video) {
      downloadVideo(video, page)
    }
  })
  await page.goto("https://www.vuemastery.com", { waitUntil: "networkidle0" });
  await auth(page, process.env.EMAIL, process.env.PASSWORD);
}

main();
