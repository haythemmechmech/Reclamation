import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HistoriqueReclamationComponentsPage, HistoriqueReclamationUpdatePage } from './historique-reclamation.page-object';

describe('HistoriqueReclamation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let historiqueReclamationUpdatePage: HistoriqueReclamationUpdatePage;
    let historiqueReclamationComponentsPage: HistoriqueReclamationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load HistoriqueReclamations', async () => {
        await navBarPage.goToEntity('historique-reclamation');
        historiqueReclamationComponentsPage = new HistoriqueReclamationComponentsPage();
        expect(await historiqueReclamationComponentsPage.getTitle()).toMatch(/reclamationApp.historiqueReclamation.home.title/);
    });

    it('should load create HistoriqueReclamation page', async () => {
        await historiqueReclamationComponentsPage.clickOnCreateButton();
        historiqueReclamationUpdatePage = new HistoriqueReclamationUpdatePage();
        expect(await historiqueReclamationUpdatePage.getPageTitle()).toMatch(/reclamationApp.historiqueReclamation.home.createOrEditLabel/);
        await historiqueReclamationUpdatePage.cancel();
    });

    it('should create and save HistoriqueReclamations', async () => {
        await historiqueReclamationComponentsPage.clickOnCreateButton();
        await historiqueReclamationUpdatePage.setDescriptionInput('description');
        expect(await historiqueReclamationUpdatePage.getDescriptionInput()).toMatch('description');
        await historiqueReclamationUpdatePage.setTitreInput('titre');
        expect(await historiqueReclamationUpdatePage.getTitreInput()).toMatch('titre');
        await historiqueReclamationUpdatePage.setCreated_atInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await historiqueReclamationUpdatePage.getCreated_atInput()).toContain('2001-01-01T02:30');
        await historiqueReclamationUpdatePage.setCreated_byInput('created_by');
        expect(await historiqueReclamationUpdatePage.getCreated_byInput()).toMatch('created_by');
        await historiqueReclamationUpdatePage.setAffected_toInput('affected_to');
        expect(await historiqueReclamationUpdatePage.getAffected_toInput()).toMatch('affected_to');
        await historiqueReclamationUpdatePage.setReclamation_idInput('5');
        expect(await historiqueReclamationUpdatePage.getReclamation_idInput()).toMatch('5');
        await historiqueReclamationUpdatePage.setUpdated_atInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await historiqueReclamationUpdatePage.getUpdated_atInput()).toContain('2001-01-01T02:30');
        await historiqueReclamationUpdatePage.setPhase_libelleInput('phase_libelle');
        expect(await historiqueReclamationUpdatePage.getPhase_libelleInput()).toMatch('phase_libelle');
        await historiqueReclamationUpdatePage.setEtat_libelleInput('etat_libelle');
        expect(await historiqueReclamationUpdatePage.getEtat_libelleInput()).toMatch('etat_libelle');
        await historiqueReclamationUpdatePage.setType_libelleInput('type_libelle');
        expect(await historiqueReclamationUpdatePage.getType_libelleInput()).toMatch('type_libelle');
        await historiqueReclamationUpdatePage.save();
        expect(await historiqueReclamationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
