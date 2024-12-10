import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
// open a new page
const page = await browser.newPage();

// visit google
await page.goto('https://google.com');
// Click the "Accept all" button
await page.click('button:has-text("Přijmout vše")');
// Type the query into the search box
await page.type('textarea[title]', 'hello world');
// Press enter
await page.keyboard.press('Enter');

// Click the first result
// For puppeteer:
// await page.click('.g a');
// await page.waitForNavigation();
// we stick those two together so that it won't start a race and freeze, forever waiting for something that has already happened
// await Promise.all([page.waitForNavigation(), page.click('.g a')]);

// for playwright - it's better to use waitForLoadState:
await page.click('.g a');
await page.waitForLoadState('load');

// grab and log the title and set is as a variable
const title = await page.title();
console.log(title);

// take a screenshot and write it in to the filesystem
await page.screenshot({ path: 'screenshot.png' });

// wait for 10 seconds before shutting down
await page.waitForTimeout(10000);
await browser.close();
