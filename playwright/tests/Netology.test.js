const { chromium } = require('playwright');
const userName = require('../user.js');
const password = require('../user.js');

const { test, expect } = require('@playwright/test');

test('successful authorizationtest', async () => {
    const browser = await chromium.launch({});

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName.userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password.password);
    await page.getByTestId('login-submit-btn').click();

    await expect(page.url()).toBe('https://netology.ru/profile');

    await browser.close();
});

test('unsuccessful authorizationtest', async () => {
    const browser = await chromium.launch({});

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName.userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill('1');
    await page.getByTestId('login-submit-btn').click();

    await expect(page.locator('.login-error-hint')).toBeVisible;

    await browser.close();
});
