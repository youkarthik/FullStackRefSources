import { CommonPage } from './common.po';
import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Register', () => {
    it('register with valid details and navigate to login', () => {
        CommonPage.navigateToLogin();
        CommonPage.buttonClick('lnkRegister');
        expect(CommonPage.getText('title')).toEqual('Register');

        const userId = new Date().valueOf();
        CommonPage.sendKeys('firstName', 'jafer');
        CommonPage.sendKeys('lastName', 'ali');
        CommonPage.sendKeys('userId', userId.toString());
        CommonPage.sendKeys('password', '1234567');

        CommonPage.buttonClick('btnRegister').then(() => {
             browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
             browser.switchTo().alert().accept().then(() => {
                expect(CommonPage.getText('title')).toEqual('Login');
            });
        });
    });
});
