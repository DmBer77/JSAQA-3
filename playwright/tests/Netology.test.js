const { chromium } = require('playwright');
const userName = require('../user.js');
const password = require('../user.js');

const { test, expect } = require('@playwright/test');

test('successful authorizationtest', async () => {
    const browser = await chromium.launch({});

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.screenshot({
        path: './playwright/screenshots/screenshot1.png',
        fullPage: true,
    });
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName.userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password.password);
    await page.screenshot({
        path: './playwright/screenshots/screenshot2.png',
        fullPage: true,
    });
    await page.getByTestId('login-submit-btn').click();

    await expect(page.url()).toBe('https://netology.ru/profile');
    await page.screenshot({
        path: './playwright/screenshots/screenshot3.png',
        fullPage: true,
    });

    await browser.close();
});

test('unsuccessful authorizationtest', async () => {
    const browser = await chromium.launch({});

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.screenshot({
        path: './playwright/screenshots/screenshot4.png',
        fullPage: true,
    });
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName.userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill('1');
    await page.screenshot({
        path: './playwright/screenshots/screenshot5.png',
        fullPage: true,
    });
    await page.getByTestId('login-submit-btn').click();

    await expect(page.locator('.login-error-hint')).toBeVisible;
    await page.screenshot({
        path: './playwright/screenshots/screenshot6.png',
        fullPage: true,
    });

    await browser.close();
});
