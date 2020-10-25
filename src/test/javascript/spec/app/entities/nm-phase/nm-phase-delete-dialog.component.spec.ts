/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_PhaseDeleteDialogComponent } from 'app/entities/nm-phase/nm-phase-delete-dialog.component';
import { Nm_PhaseService } from 'app/entities/nm-phase/nm-phase.service';

describe('Component Tests', () => {
    describe('Nm_Phase Management Delete Component', () => {
        let comp: Nm_PhaseDeleteDialogComponent;
        let fixture: ComponentFixture<Nm_PhaseDeleteDialogComponent>;
        let service: Nm_PhaseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_PhaseDeleteDialogComponent]
            })
                .overrideTemplate(Nm_PhaseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Nm_PhaseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_PhaseService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
