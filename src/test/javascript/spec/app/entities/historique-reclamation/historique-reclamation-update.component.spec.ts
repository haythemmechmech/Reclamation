/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { HistoriqueReclamationUpdateComponent } from 'app/entities/historique-reclamation/historique-reclamation-update.component';
import { HistoriqueReclamationService } from 'app/entities/historique-reclamation/historique-reclamation.service';
import { HistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

describe('Component Tests', () => {
    describe('HistoriqueReclamation Management Update Component', () => {
        let comp: HistoriqueReclamationUpdateComponent;
        let fixture: ComponentFixture<HistoriqueReclamationUpdateComponent>;
        let service: HistoriqueReclamationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [HistoriqueReclamationUpdateComponent]
            })
                .overrideTemplate(HistoriqueReclamationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HistoriqueReclamationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoriqueReclamationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HistoriqueReclamation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.historiqueReclamation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HistoriqueReclamation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.historiqueReclamation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
