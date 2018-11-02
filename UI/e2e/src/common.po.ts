import { browser, by, element, promise, protractor } from 'protractor';

export class CommonPage {

    static sendKeys(id: string, values: string) {
        element(by.id(id)).clear();
        element(by.id(id)).sendKeys(values);
    }

    static buttonClick(id: string): promise.Promise<any> {
        return element(by.id(id)).click();
    }

    static getText(id: string): promise.Promise<any> {
        return element(by.id(id)).getText();
    }

    static navigateToLogin() {
        return browser.get('/login');
    }

    static clickMovie(): promise.Promise<any> {
        return element(by.css('.card-img-top')).click();
    }
}
