/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_TypeReclamationDeleteDialogComponent } from 'app/entities/nm-type-reclamation/nm-type-reclamation-delete-dialog.component';
import { Nm_TypeReclamationService } from 'app/entities/nm-type-reclamation/nm-type-reclamation.service';

describe('Component Tests', () => {
    describe('Nm_TypeReclamation Management Delete Component', () => {
        let comp: Nm_TypeReclamationDeleteDialogComponent;
        let fixture: ComponentFixture<Nm_TypeReclamationDeleteDialogComponent>;
        let service: Nm_TypeReclamationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_TypeReclamationDeleteDialogComponent]
            })
                .overrideTemplate(Nm_TypeReclamationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Nm_TypeReclamationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_TypeReclamationService);
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
