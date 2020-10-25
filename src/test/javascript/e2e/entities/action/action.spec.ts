import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActionComponentsPage, ActionUpdatePage } from './action.page-object';

describe('Action e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let actionUpdatePage: ActionUpdatePage;
    let actionComponentsPage: ActionComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Actions', async () => {
        await navBarPage.goToEntity('action');
        actionComponentsPage = new ActionComponentsPage();
        expect(await actionComponentsPage.getTitle()).toMatch(/reclamationApp.action.home.title/);
    });

    it('should load create Action page', async () => {
        await actionComponentsPage.clickOnCreateButton();
        actionUpdatePage = new ActionUpdatePage();
        expect(await actionUpdatePage.getPageTitle()).toMatch(/reclamationApp.action.home.createOrEditLabel/);
        await actionUpdatePage.cancel();
    });

    it('should create and save Actions', async () => {
        await actionComponentsPage.clickOnCreateButton();
        await actionUpdatePage.setPhase_precedenteInput('phase_precedente');
        expect(await actionUpdatePage.getPhase_precedenteInput()).toMatch('phase_precedente');
        await actionUpdatePage.setOrdreInput('ordre');
        expect(await actionUpdatePage.getOrdreInput()).toMatch('ordre');
        await actionUpdatePage.setDescriptionInput('description');
        expect(await actionUpdatePage.getDescriptionInput()).toMatch('description');
        await actionUpdatePage.setPhase_actuelleInput('phase_actuelle');
        expect(await actionUpdatePage.getPhase_actuelleInput()).toMatch('phase_actuelle');
        // actionUpdatePage.nm_PhaseSuivantSelectLastOption();
        await actionUpdatePage.save();
        expect(await actionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
