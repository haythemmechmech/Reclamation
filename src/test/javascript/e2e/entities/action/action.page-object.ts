import { element, by, ElementFinder } from 'protractor';

export class ActionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-action div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ActionUpdatePage {
    pageTitle = element(by.id('jhi-action-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    phase_precedenteInput = element(by.id('field_phase_precedente'));
    ordreInput = element(by.id('field_ordre'));
    descriptionInput = element(by.id('field_description'));
    phase_actuelleInput = element(by.id('field_phase_actuelle'));
    nm_PhaseSuivantSelect = element(by.id('field_nm_PhaseSuivant'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPhase_precedenteInput(phase_precedente) {
        await this.phase_precedenteInput.sendKeys(phase_precedente);
    }

    async getPhase_precedenteInput() {
        return this.phase_precedenteInput.getAttribute('value');
    }

    async setOrdreInput(ordre) {
        await this.ordreInput.sendKeys(ordre);
    }

    async getOrdreInput() {
        return this.ordreInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPhase_actuelleInput(phase_actuelle) {
        await this.phase_actuelleInput.sendKeys(phase_actuelle);
    }

    async getPhase_actuelleInput() {
        return this.phase_actuelleInput.getAttribute('value');
    }

    async nm_PhaseSuivantSelectLastOption() {
        await this.nm_PhaseSuivantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async nm_PhaseSuivantSelectOption(option) {
        await this.nm_PhaseSuivantSelect.sendKeys(option);
    }

    getNm_PhaseSuivantSelect(): ElementFinder {
        return this.nm_PhaseSuivantSelect;
    }

    async getNm_PhaseSuivantSelectedOption() {
        return this.nm_PhaseSuivantSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
