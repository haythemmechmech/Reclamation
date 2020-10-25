import { element, by, ElementFinder } from 'protractor';

export class HistoriqueReclamationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-historique-reclamation div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class HistoriqueReclamationUpdatePage {
    pageTitle = element(by.id('jhi-historique-reclamation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    titreInput = element(by.id('field_titre'));
    created_atInput = element(by.id('field_created_at'));
    created_byInput = element(by.id('field_created_by'));
    affected_toInput = element(by.id('field_affected_to'));
    reclamation_idInput = element(by.id('field_reclamation_id'));
    updated_atInput = element(by.id('field_updated_at'));
    phase_libelleInput = element(by.id('field_phase_libelle'));
    etat_libelleInput = element(by.id('field_etat_libelle'));
    type_libelleInput = element(by.id('field_type_libelle'));

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

    async setAffected_toInput(affected_to) {
        await this.affected_toInput.sendKeys(affected_to);
    }

    async getAffected_toInput() {
        return this.affected_toInput.getAttribute('value');
    }

    async setReclamation_idInput(reclamation_id) {
        await this.reclamation_idInput.sendKeys(reclamation_id);
    }

    async getReclamation_idInput() {
        return this.reclamation_idInput.getAttribute('value');
    }

    async setUpdated_atInput(updated_at) {
        await this.updated_atInput.sendKeys(updated_at);
    }

    async getUpdated_atInput() {
        return this.updated_atInput.getAttribute('value');
    }

    async setPhase_libelleInput(phase_libelle) {
        await this.phase_libelleInput.sendKeys(phase_libelle);
    }

    async getPhase_libelleInput() {
        return this.phase_libelleInput.getAttribute('value');
    }

    async setEtat_libelleInput(etat_libelle) {
        await this.etat_libelleInput.sendKeys(etat_libelle);
    }

    async getEtat_libelleInput() {
        return this.etat_libelleInput.getAttribute('value');
    }

    async setType_libelleInput(type_libelle) {
        await this.type_libelleInput.sendKeys(type_libelle);
    }

    async getType_libelleInput() {
        return this.type_libelleInput.getAttribute('value');
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
