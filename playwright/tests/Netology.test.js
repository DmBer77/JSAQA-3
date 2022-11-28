const { chromium } = require('playwright');
const userName = require('../user.js');
const password = require('../user.js');

test('successful authorizationtest', async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 25000,
        devtools: true,
    });

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password);
    await page.getByTestId('login-submit-btn').click();

    await expect(page).toHaveURL('https://netology.ru/profile/7851566');
    await expect(
        page.locator('.src-components-pages-Profile-Programs--title--Kw5NH'),
    ).toHaveText('Мои курсы и профессии');

    await browser.close();
});

// import { test, expect } from '@playwright/test';

test('test', async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 25000,
    });

    const page = await browser.newPage();
    await page.goto('https://netology.ru/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password);
    await page.getByTestId('login-submit-btn').click();

    await expect(page).toHaveURL('https://netology.ru/profile/7851566');
    await expect(
        page.locator('.src-components-pages-Profile-Programs--title--Kw5NH'),
    ).toHaveText('Мои курсы и профессии');

    await browser.close();
});

test('unsuccessful authorizationtest', async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 15000,
        devtools: true,
    });

    const page = await browser.newPage();

    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(userName);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(1);
    await page.getByTestId('login-submit-btn').click();

    await expect(page.locator('.login - error - hint')).toHaveText(
        'Вы ввели неправильно логин или пароль',
    );

    await browser.close();
});
