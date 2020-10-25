/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_TypeReclamationDetailComponent } from 'app/entities/nm-type-reclamation/nm-type-reclamation-detail.component';
import { Nm_TypeReclamation } from 'app/shared/model/nm-type-reclamation.model';

describe('Component Tests', () => {
    describe('Nm_TypeReclamation Management Detail Component', () => {
        let comp: Nm_TypeReclamationDetailComponent;
        let fixture: ComponentFixture<Nm_TypeReclamationDetailComponent>;
        const route = ({ data: of({ nm_TypeReclamation: new Nm_TypeReclamation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_TypeReclamationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Nm_TypeReclamationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Nm_TypeReclamationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nm_TypeReclamation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
