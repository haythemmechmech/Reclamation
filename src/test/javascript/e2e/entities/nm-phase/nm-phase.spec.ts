import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Nm_PhaseComponentsPage, Nm_PhaseUpdatePage } from './nm-phase.page-object';

describe('Nm_Phase e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let nm_PhaseUpdatePage: Nm_PhaseUpdatePage;
    let nm_PhaseComponentsPage: Nm_PhaseComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Nm_Phases', async () => {
        await navBarPage.goToEntity('nm-phase');
        nm_PhaseComponentsPage = new Nm_PhaseComponentsPage();
        expect(await nm_PhaseComponentsPage.getTitle()).toMatch(/reclamationApp.nm_Phase.home.title/);
    });

    it('should load create Nm_Phase page', async () => {
        await nm_PhaseComponentsPage.clickOnCreateButton();
        nm_PhaseUpdatePage = new Nm_PhaseUpdatePage();
        expect(await nm_PhaseUpdatePage.getPageTitle()).toMatch(/reclamationApp.nm_Phase.home.createOrEditLabel/);
        await nm_PhaseUpdatePage.cancel();
    });

    it('should create and save Nm_Phases', async () => {
        await nm_PhaseComponentsPage.clickOnCreateButton();
        await nm_PhaseUpdatePage.setLibelleInput('libelle');
        expect(await nm_PhaseUpdatePage.getLibelleInput()).toMatch('libelle');
        await nm_PhaseUpdatePage.setCodeInput('code');
        expect(await nm_PhaseUpdatePage.getCodeInput()).toMatch('code');
        await nm_PhaseUpdatePage.save();
        expect(await nm_PhaseUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
