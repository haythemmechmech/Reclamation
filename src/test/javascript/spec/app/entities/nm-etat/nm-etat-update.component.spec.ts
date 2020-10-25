/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_EtatUpdateComponent } from 'app/entities/nm-etat/nm-etat-update.component';
import { Nm_EtatService } from 'app/entities/nm-etat/nm-etat.service';
import { Nm_Etat } from 'app/shared/model/nm-etat.model';

describe('Component Tests', () => {
    describe('Nm_Etat Management Update Component', () => {
        let comp: Nm_EtatUpdateComponent;
        let fixture: ComponentFixture<Nm_EtatUpdateComponent>;
        let service: Nm_EtatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_EtatUpdateComponent]
            })
                .overrideTemplate(Nm_EtatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_EtatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_EtatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Nm_Etat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_Etat = entity;
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
                    const entity = new Nm_Etat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_Etat = entity;
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
