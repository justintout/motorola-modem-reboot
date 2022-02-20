#!/usr/bin/env node
import { chromium } from "playwright";
import { pkgVersion } from './version';

const helpFlags = ['help', '-h', '-help', '--help'];
const usage = `Usage: reboot-modem [-h] [-v]`;
const options = [
    'Options:',
    '\t-h:\tPrint this help and exit',
].join('\n')
const variables = [
    'Varaibles:', 
    '\tMODEM_REBOOT_HOST:\t use this URL to reach the modem',
    '\tMODEM_REBOOT_USER:\t use this username to log into the modem',
    '\tMODEM_REBOOT_PASSWORD:\t use this password to log into the modem'
].join('\n');
const help = `${usage}\n\n${options}\n${variables}`;

const versionFlags = ['version', '-v', '-version', '--version'];
const version = `modem-reboot v${pkgVersion}`;

(async () => {
    process.argv.forEach((a) => {
        if (helpFlags.includes(a)) {
            console.log(help);
            process.exit(0);
        }
        if (versionFlags.includes(a)) {
            console.log(version);
            process.exit(0);
        }
    });

    const username = process.env['MODEM_REBOOT_USER'] ?? 'admin';
    const password = process.env['MODEM_REBOOT_PASSWORD'] ?? 'motorola';
    const host = process.env['MODEN_REBOOT_HOST'] ?? 'http://192.168.100.1';
    try {
        await reboot(host, username, password);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

async function reboot(host: string, username: string, password: string) {
    let browser, page;
    try {
        browser = await chromium.launch();
        page = await browser.newPage();
    } catch (err: any) {
        throw new Error(`failed to launch the browser: ${err}`);
    }

    try {
        await page.goto(`${host}/Login.html`);
        await page.fill("#loginUsername", username);
        await page.click("#loginText"); // you specifically have to click the password field?!?!
        await page.fill("#loginPassword", password);
        await Promise.all([
            page.waitForNavigation({timeout: 3000}),
            page.click("#LoginApply"),
        ]);
    } catch (err: any) {
        throw new Error(`failed to log in: ${err}`);
    }

    try {
        await page.goto(`${host}/MotoSecurity.html`);
        await page.click('input[type="button"][value="Reboot"]');
    } catch (err: any) {
        throw new Error(`failed to perform reboot: ${err}`)
    }
}