/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_PhaseUpdateComponent } from 'app/entities/nm-phase/nm-phase-update.component';
import { Nm_PhaseService } from 'app/entities/nm-phase/nm-phase.service';
import { Nm_Phase } from 'app/shared/model/nm-phase.model';

describe('Component Tests', () => {
    describe('Nm_Phase Management Update Component', () => {
        let comp: Nm_PhaseUpdateComponent;
        let fixture: ComponentFixture<Nm_PhaseUpdateComponent>;
        let service: Nm_PhaseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_PhaseUpdateComponent]
            })
                .overrideTemplate(Nm_PhaseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_PhaseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_PhaseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Nm_Phase(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_Phase = entity;
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
                    const entity = new Nm_Phase();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nm_Phase = entity;
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
