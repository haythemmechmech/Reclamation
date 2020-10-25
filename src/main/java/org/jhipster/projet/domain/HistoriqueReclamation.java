package org.jhipster.projet.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A HistoriqueReclamation.
 */
@Entity
@Table(name = "historique_reclamation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoriqueReclamation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "titre")
    private String titre;

    @Column(name = "created_at")
    private ZonedDateTime created_at;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "affected_to")
    private String affected_to;

    @Column(name = "reclamation_id")
    private Long reclamation_id;

    @Column(name = "updated_at")
    private ZonedDateTime updated_at;

    @Column(name = "phase_libelle")
    private String phase_libelle;

    @Column(name = "etat_libelle")
    private String etat_libelle;

    @Column(name = "type_libelle")
    private String type_libelle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public HistoriqueReclamation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitre() {
        return titre;
    }

    public HistoriqueReclamation titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public ZonedDateTime getCreated_at() {
        return created_at;
    }

    public HistoriqueReclamation created_at(ZonedDateTime created_at) {
        this.created_at = created_at;
        return this;
    }

    public void setCreated_at(ZonedDateTime created_at) {
        this.created_at = created_at;
    }

    public String getCreated_by() {
        return created_by;
    }

    public HistoriqueReclamation created_by(String created_by) {
        this.created_by = created_by;
        return this;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getAffected_to() {
        return affected_to;
    }

    public HistoriqueReclamation affected_to(String affected_to) {
        this.affected_to = affected_to;
        return this;
    }

    public void setAffected_to(String affected_to) {
        this.affected_to = affected_to;
    }

    public Long getReclamation_id() {
        return reclamation_id;
    }

    public HistoriqueReclamation reclamation_id(Long reclamation_id) {
        this.reclamation_id = reclamation_id;
        return this;
    }

    public void setReclamation_id(Long reclamation_id) {
        this.reclamation_id = reclamation_id;
    }

    public ZonedDateTime getUpdated_at() {
        return updated_at;
    }

    public HistoriqueReclamation updated_at(ZonedDateTime updated_at) {
        this.updated_at = updated_at;
        return this;
    }

    public void setUpdated_at(ZonedDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public String getPhase_libelle() {
        return phase_libelle;
    }

    public HistoriqueReclamation phase_libelle(String phase_libelle) {
        this.phase_libelle = phase_libelle;
        return this;
    }

    public void setPhase_libelle(String phase_libelle) {
        this.phase_libelle = phase_libelle;
    }

    public String getEtat_libelle() {
        return etat_libelle;
    }

    public HistoriqueReclamation etat_libelle(String etat_libelle) {
        this.etat_libelle = etat_libelle;
        return this;
    }

    public void setEtat_libelle(String etat_libelle) {
        this.etat_libelle = etat_libelle;
    }

    public String getType_libelle() {
        return type_libelle;
    }

    public HistoriqueReclamation type_libelle(String type_libelle) {
        this.type_libelle = type_libelle;
        return this;
    }

    public void setType_libelle(String type_libelle) {
        this.type_libelle = type_libelle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HistoriqueReclamation historiqueReclamation = (HistoriqueReclamation) o;
        if (historiqueReclamation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), historiqueReclamation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HistoriqueReclamation{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", titre='" + getTitre() + "'" +
            ", created_at='" + getCreated_at() + "'" +
            ", created_by='" + getCreated_by() + "'" +
            ", affected_to='" + getAffected_to() + "'" +
            ", reclamation_id=" + getReclamation_id() +
            ", updated_at='" + getUpdated_at() + "'" +
            ", phase_libelle='" + getPhase_libelle() + "'" +
            ", etat_libelle='" + getEtat_libelle() + "'" +
            ", type_libelle='" + getType_libelle() + "'" +
            "}";
    }
}
