/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReclamationTestModule } from '../../../test.module';
import { ReclamationComponent } from 'app/entities/reclamation/reclamation.component';
import { ReclamationService } from 'app/entities/reclamation/reclamation.service';
import { Reclamation } from 'app/shared/model/reclamation.model';

describe('Component Tests', () => {
    describe('Reclamation Management Component', () => {
        let comp: ReclamationComponent;
        let fixture: ComponentFixture<ReclamationComponent>;
        let service: ReclamationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [ReclamationComponent],
                providers: []
            })
                .overrideTemplate(ReclamationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReclamationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReclamationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Reclamation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reclamations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
