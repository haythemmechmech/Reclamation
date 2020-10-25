/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_TypeReclamationUpdateComponent } from 'app/entities/nm-type-reclamation/nm-type-reclamation-update.component';
import { Nm_TypeReclamationService } from 'app/entities/nm-type-reclamation/nm-type-reclamation.service';
import { Nm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

describe('Component Tests', () => {
    describe('Nm_TypeReclamation Management Update Component', () => {
        let comp: Nm_TypeReclamationUpdateComponent;
        let fixture: ComponentFixture<Nm_TypeReclamationUpdateComponent>;
        let service: Nm_TypeReclamationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_TypeReclamationUpdateComponent]
            })
                .overrideTemplate(Nm_TypeReclamationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_TypeReclamationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_TypeReclamationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Nm_TypeReclamation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_TypeReclamation = entity;
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
                    const entity = new Nm_TypeReclamation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_TypeReclamation = entity;
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
