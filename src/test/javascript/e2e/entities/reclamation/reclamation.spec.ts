import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReclamationComponentsPage, ReclamationUpdatePage } from './reclamation.page-object';

describe('Reclamation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let reclamationUpdatePage: ReclamationUpdatePage;
    let reclamationComponentsPage: ReclamationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Reclamations', async () => {
        await navBarPage.goToEntity('reclamation');
        reclamationComponentsPage = new ReclamationComponentsPage();
        expect(await reclamationComponentsPage.getTitle()).toMatch(/reclamationApp.reclamation.home.title/);
    });

    it('should load create Reclamation page', async () => {
        await reclamationComponentsPage.clickOnCreateButton();
        reclamationUpdatePage = new ReclamationUpdatePage();
        expect(await reclamationUpdatePage.getPageTitle()).toMatch(/reclamationApp.reclamation.home.createOrEditLabel/);
        await reclamationUpdatePage.cancel();
    });

    it('should create and save Reclamations', async () => {
        await reclamationComponentsPage.clickOnCreateButton();
        await reclamationUpdatePage.setDescriptionInput('description');
        expect(await reclamationUpdatePage.getDescriptionInput()).toMatch('description');
        await reclamationUpdatePage.setTitreInput('titre');
        expect(await reclamationUpdatePage.getTitreInput()).toMatch('titre');
        await reclamationUpdatePage.setCreated_atInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await reclamationUpdatePage.getCreated_atInput()).toContain('2001-01-01T02:30');
        await reclamationUpdatePage.setCreated_byInput('created_by');
        expect(await reclamationUpdatePage.getCreated_byInput()).toMatch('created_by');
        await reclamationUpdatePage.setUpdated_atInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await reclamationUpdatePage.getUpdated_atInput()).toContain('2001-01-01T02:30');
        await reclamationUpdatePage.setAffected_toInput('affected_to');
        expect(await reclamationUpdatePage.getAffected_toInput()).toMatch('affected_to');
        // reclamationUpdatePage.nm_EtatSelectLastOption();
        await reclamationUpdatePage.nm_TypeReclamationSelectLastOption();
        // reclamationUpdatePage.phaseSelectLastOption();
        await reclamationUpdatePage.save();
        expect(await reclamationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
