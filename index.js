import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
await browser.newPage();

await browser.close();
