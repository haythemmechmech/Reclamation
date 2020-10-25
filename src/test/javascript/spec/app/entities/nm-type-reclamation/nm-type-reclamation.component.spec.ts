/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_TypeReclamationComponent } from 'app/entities/nm-type-reclamation/nm-type-reclamation.component';
import { Nm_TypeReclamationService } from 'app/entities/nm-type-reclamation/nm-type-reclamation.service';
import { Nm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

describe('Component Tests', () => {
    describe('Nm_TypeReclamation Management Component', () => {
        let comp: Nm_TypeReclamationComponent;
        let fixture: ComponentFixture<Nm_TypeReclamationComponent>;
        let service: Nm_TypeReclamationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_TypeReclamationComponent],
                providers: []
            })
                .overrideTemplate(Nm_TypeReclamationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_TypeReclamationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_TypeReclamationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Nm_TypeReclamation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nm_TypeReclamations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
