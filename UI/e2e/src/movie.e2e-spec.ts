import { CommonPage } from './common.po';

describe('Movie List', () => {

    beforeEach(() => {
        CommonPage.navigateToLogin();
        CommonPage.sendKeys('username', 'raji');
        CommonPage.sendKeys('password', '123456');

        CommonPage.buttonClick('btnLogin').then(() => {
            expect(CommonPage.getText('title')).toEqual('Popular Movies');
        });
    });

    it('should navigate to popular movies', () => {
        expect(CommonPage.getText('title')).toEqual('Popular Movies');
    });

    it('should display movie details', () => {
        CommonPage.clickMovie().then(() => {
            expect(CommonPage.getText('title')).not.toBeNull();
            expect(CommonPage.getText('overview')).not.toBeNull();
            expect(CommonPage.getText('movie-likes')).not.toBeNull();
            expect(CommonPage.getText('btnWishList')).toEqual('Add to Wishlist');
            expect(CommonPage.getText('recomentedMovies')).toEqual('Recommended Movies');
        });
    });
});
