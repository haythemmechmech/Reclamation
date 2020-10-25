/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_PhaseDetailComponent } from 'app/entities/nm-phase/nm-phase-detail.component';
import { Nm_Phase } from 'app/shared/model/nm-phase.model';

describe('Component Tests', () => {
    describe('Nm_Phase Management Detail Component', () => {
        let comp: Nm_PhaseDetailComponent;
        let fixture: ComponentFixture<Nm_PhaseDetailComponent>;
        const route = ({ data: of({ nm_Phase: new Nm_Phase(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_PhaseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Nm_PhaseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Nm_PhaseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nm_Phase).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
