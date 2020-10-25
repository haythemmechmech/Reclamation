/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { HistoriqueReclamationDetailComponent } from 'app/entities/historique-reclamation/historique-reclamation-detail.component';
import { HistoriqueReclamation } from 'app/shared/model/historique-reclamation.model';

describe('Component Tests', () => {
    describe('HistoriqueReclamation Management Detail Component', () => {
        let comp: HistoriqueReclamationDetailComponent;
        let fixture: ComponentFixture<HistoriqueReclamationDetailComponent>;
        const route = ({ data: of({ historiqueReclamation: new HistoriqueReclamation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [HistoriqueReclamationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HistoriqueReclamationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HistoriqueReclamationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.historiqueReclamation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
