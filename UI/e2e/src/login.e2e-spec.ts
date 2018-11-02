import { CommonPage } from './common.po';

describe('Login', () => {

    beforeEach(() => {
       CommonPage.navigateToLogin();
    });

    it('Should login and display popular movies', () => {
        expect(CommonPage.getText('title')).toEqual('Login');
        CommonPage.sendKeys('username', 'raji');
        CommonPage.sendKeys('password', '123456');

        CommonPage.buttonClick('btnLogin').then(() => {
            expect(CommonPage.getText('title')).toEqual('Popular Movies');
        });
    });

    it('Should not login and display error message', () => {
        CommonPage.sendKeys('username', 'raji');
        CommonPage.sendKeys('password', 'test');

        CommonPage.buttonClick('btnLogin').then(() => {
            expect(CommonPage.getText('error')).toEqual('UserName or password incorrect');
        });
    });
});
