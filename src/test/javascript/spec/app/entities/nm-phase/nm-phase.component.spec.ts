/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_PhaseComponent } from 'app/entities/nm-phase/nm-phase.component';
import { Nm_PhaseService } from 'app/entities/nm-phase/nm-phase.service';
import { Nm_Phase } from 'app/shared/model/nm-phase.model';

describe('Component Tests', () => {
    describe('Nm_Phase Management Component', () => {
        let comp: Nm_PhaseComponent;
        let fixture: ComponentFixture<Nm_PhaseComponent>;
        let service: Nm_PhaseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_PhaseComponent],
                providers: []
            })
                .overrideTemplate(Nm_PhaseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_PhaseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_PhaseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Nm_Phase(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nm_Phases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
