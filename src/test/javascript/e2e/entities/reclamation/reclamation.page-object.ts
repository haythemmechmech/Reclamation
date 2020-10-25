import { element, by, ElementFinder } from 'protractor';

export class ReclamationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-reclamation div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReclamationUpdatePage {
    pageTitle = element(by.id('jhi-reclamation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    titreInput = element(by.id('field_titre'));
    created_atInput = element(by.id('field_created_at'));
    created_byInput = element(by.id('field_created_by'));
    updated_atInput = element(by.id('field_updated_at'));
    affected_toInput = element(by.id('field_affected_to'));
    nm_EtatSelect = element(by.id('field_nm_Etat'));
    nm_TypeReclamationSelect = element(by.id('field_nm_TypeReclamation'));
    phaseSelect = element(by.id('field_phase'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setTitreInput(titre) {
        await this.titreInput.sendKeys(titre);
    }

    async getTitreInput() {
        return this.titreInput.getAttribute('value');
    }

    async setCreated_atInput(created_at) {
        await this.created_atInput.sendKeys(created_at);
    }

    async getCreated_atInput() {
        return this.created_atInput.getAttribute('value');
    }

    async setCreated_byInput(created_by) {
        await this.created_byInput.sendKeys(created_by);
    }

    async getCreated_byInput() {
        return this.created_byInput.getAttribute('value');
    }

    async setUpdated_atInput(updated_at) {
        await this.updated_atInput.sendKeys(updated_at);
    }

    async getUpdated_atInput() {
        return this.updated_atInput.getAttribute('value');
    }

    async setAffected_toInput(affected_to) {
        await this.affected_toInput.sendKeys(affected_to);
    }

    async getAffected_toInput() {
        return this.affected_toInput.getAttribute('value');
    }

    async nm_EtatSelectLastOption() {
        await this.nm_EtatSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async nm_EtatSelectOption(option) {
        await this.nm_EtatSelect.sendKeys(option);
    }

    getNm_EtatSelect(): ElementFinder {
        return this.nm_EtatSelect;
    }

    async getNm_EtatSelectedOption() {
        return this.nm_EtatSelect.element(by.css('option:checked')).getText();
    }

    async nm_TypeReclamationSelectLastOption() {
        await this.nm_TypeReclamationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async nm_TypeReclamationSelectOption(option) {
        await this.nm_TypeReclamationSelect.sendKeys(option);
    }

    getNm_TypeReclamationSelect(): ElementFinder {
        return this.nm_TypeReclamationSelect;
    }

    async getNm_TypeReclamationSelectedOption() {
        return this.nm_TypeReclamationSelect.element(by.css('option:checked')).getText();
    }

    async phaseSelectLastOption() {
        await this.phaseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async phaseSelectOption(option) {
        await this.phaseSelect.sendKeys(option);
    }

    getPhaseSelect(): ElementFinder {
        return this.phaseSelect;
    }

    async getPhaseSelectedOption() {
        return this.phaseSelect.element(by.css('option:checked')).getText();
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
