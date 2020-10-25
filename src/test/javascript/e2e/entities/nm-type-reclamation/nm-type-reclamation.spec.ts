import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Nm_TypeReclamationComponentsPage, Nm_TypeReclamationUpdatePage } from './nm-type-reclamation.page-object';

describe('Nm_TypeReclamation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let nm_TypeReclamationUpdatePage: Nm_TypeReclamationUpdatePage;
    let nm_TypeReclamationComponentsPage: Nm_TypeReclamationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Nm_TypeReclamations', async () => {
        await navBarPage.goToEntity('nm-type-reclamation');
        nm_TypeReclamationComponentsPage = new Nm_TypeReclamationComponentsPage();
        expect(await nm_TypeReclamationComponentsPage.getTitle()).toMatch(/reclamationApp.nm_TypeReclamation.home.title/);
    });

    it('should load create Nm_TypeReclamation page', async () => {
        await nm_TypeReclamationComponentsPage.clickOnCreateButton();
        nm_TypeReclamationUpdatePage = new Nm_TypeReclamationUpdatePage();
        expect(await nm_TypeReclamationUpdatePage.getPageTitle()).toMatch(/reclamationApp.nm_TypeReclamation.home.createOrEditLabel/);
        await nm_TypeReclamationUpdatePage.cancel();
    });

    it('should create and save Nm_TypeReclamations', async () => {
        await nm_TypeReclamationComponentsPage.clickOnCreateButton();
        await nm_TypeReclamationUpdatePage.setLibelleInput('libelle');
        expect(await nm_TypeReclamationUpdatePage.getLibelleInput()).toMatch('libelle');
        await nm_TypeReclamationUpdatePage.setCodeInput('code');
        expect(await nm_TypeReclamationUpdatePage.getCodeInput()).toMatch('code');
        await nm_TypeReclamationUpdatePage.save();
        expect(await nm_TypeReclamationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
