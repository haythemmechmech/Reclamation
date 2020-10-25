import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Nm_EtatComponentsPage, Nm_EtatUpdatePage } from './nm-etat.page-object';

describe('Nm_Etat e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let nm_EtatUpdatePage: Nm_EtatUpdatePage;
    let nm_EtatComponentsPage: Nm_EtatComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Nm_Etats', async () => {
        await navBarPage.goToEntity('nm-etat');
        nm_EtatComponentsPage = new Nm_EtatComponentsPage();
        expect(await nm_EtatComponentsPage.getTitle()).toMatch(/reclamationApp.nm_Etat.home.title/);
    });

    it('should load create Nm_Etat page', async () => {
        await nm_EtatComponentsPage.clickOnCreateButton();
        nm_EtatUpdatePage = new Nm_EtatUpdatePage();
        expect(await nm_EtatUpdatePage.getPageTitle()).toMatch(/reclamationApp.nm_Etat.home.createOrEditLabel/);
        await nm_EtatUpdatePage.cancel();
    });

    it('should create and save Nm_Etats', async () => {
        await nm_EtatComponentsPage.clickOnCreateButton();
        await nm_EtatUpdatePage.setLibelleInput('libelle');
        expect(await nm_EtatUpdatePage.getLibelleInput()).toMatch('libelle');
        await nm_EtatUpdatePage.setCodeInput('code');
        expect(await nm_EtatUpdatePage.getCodeInput()).toMatch('code');
        await nm_EtatUpdatePage.save();
        expect(await nm_EtatUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
