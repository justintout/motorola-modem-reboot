#!/usr/bin/env node
import { chromium } from "playwright";

const host = 'http://192.168.100.1'

const username = 'admin';
const password = 'motorola';

(async () => {
    try {
        await main(username, password);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

async function main(username: string, password: string) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        await page.goto(`${host}/Login.html`);
        await page.fill("#loginUsername", username);
        await page.click("#loginText"); // you specifically have to click the password field?!?!
        await page.fill("#loginPassword", password);
        await Promise.all([
            page.waitForNavigation({timeout: 3000}),
            page.click("#LoginApply"),
        ]);
    } catch (e) {
        throw new Error(`failed to log in: ${e}`);
    }
    await page.goto(`${host}/MotoSecurity.html`);
    await page.click('input[type="button"][value="Reboot"]');
}