/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_EtatDetailComponent } from 'app/entities/nm-etat/nm-etat-detail.component';
import { Nm_Etat } from 'app/shared/model/nm-etat.model';

describe('Component Tests', () => {
    describe('Nm_Etat Management Detail Component', () => {
        let comp: Nm_EtatDetailComponent;
        let fixture: ComponentFixture<Nm_EtatDetailComponent>;
        const route = ({ data: of({ nm_Etat: new Nm_Etat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_EtatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Nm_EtatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Nm_EtatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nm_Etat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
