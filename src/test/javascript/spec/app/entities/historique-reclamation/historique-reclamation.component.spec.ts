/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReclamationTestModule } from '../../../test.module';
import { HistoriqueReclamationComponent } from 'app/entities/historique-reclamation/historique-reclamation.component';
import { HistoriqueReclamationService } from 'app/entities/historique-reclamation/historique-reclamation.service';
import { HistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

describe('Component Tests', () => {
    describe('HistoriqueReclamation Management Component', () => {
        let comp: HistoriqueReclamationComponent;
        let fixture: ComponentFixture<HistoriqueReclamationComponent>;
        let service: HistoriqueReclamationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [HistoriqueReclamationComponent],
                providers: []
            })
                .overrideTemplate(HistoriqueReclamationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HistoriqueReclamationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoriqueReclamationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HistoriqueReclamation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.historiqueReclamations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
