import { CommonPage } from './common.po';
import { browser, protractor } from 'protractor';

describe('Wish List', () => {

    beforeEach(() => {
        CommonPage.navigateToLogin();
        CommonPage.sendKeys('userName', 'jafer');
        CommonPage.sendKeys('password', '1234567');

        CommonPage.buttonClick('btnLogin').then(() => {
            expect(CommonPage.getText('title')).toEqual('Popular Movies');
        });
    });

    it('add movie to wishlist', () => {
        CommonPage.clickMovie().then(() => {
            CommonPage.sendKeys('comments', 'good');
            CommonPage.buttonClick('btnWishList').then(() => {
                browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
                browser.switchTo().alert().accept().then(() => {
                    expect(CommonPage.getText('title')).toEqual('My Wishlist');
                });
            });
        });
    });

    it('update the comments', () => {
        CommonPage.buttonClick('myWishlist').then(() => {
            CommonPage.sendKeys('comments', 'good');
            CommonPage.buttonClick('btnSave').then(() => {
                browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
                browser.switchTo().alert().accept().then(() => {
                    expect(CommonPage.getText('title')).toEqual('My Wishlist');
                });
            });
        });
    });

    it('should deletethe  movie from wishlist', () => {
        CommonPage.buttonClick('myWishlist').then(() => {
            CommonPage.buttonClick('btnDelete').then(() => {
                browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
                browser.switchTo().alert().accept().then(() => {
                    expect(CommonPage.getText('title')).toEqual('My Wishlist');
                });
            });
        });
    });
});
