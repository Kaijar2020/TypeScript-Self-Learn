import { Locator, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Common methods for all pages can be added here
    async _click(locator: Locator) {
        await this.page.waitForLoadState('domcontentloaded')
        await locator.click();
    }

    async _dblClick(locator: Locator) {
        await locator.dblclick();
    }

    async _fill(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text);
    }

    async _getText(locator: Locator): Promise<string> {
        return await locator.textContent() ?? '';
    }

    async _isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
    async _scrollIntoView(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }
    async _verifyURL(locator: string): Promise<boolean> {
        const url = this.page.url();
        return url.includes(locator) ? true : false;
    }
    async _checkIsEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

}
