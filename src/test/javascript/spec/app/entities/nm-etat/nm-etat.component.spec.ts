/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReclamationTestModule } from '../../../test.module';
import { Nm_EtatComponent } from 'app/entities/nm-etat/nm-etat.component';
import { Nm_EtatService } from 'app/entities/nm-etat/nm-etat.service';
import { Nm_Etat } from 'app/shared/model/nm-etat.model';

describe('Component Tests', () => {
    describe('Nm_Etat Management Component', () => {
        let comp: Nm_EtatComponent;
        let fixture: ComponentFixture<Nm_EtatComponent>;
        let service: Nm_EtatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReclamationTestModule],
                declarations: [Nm_EtatComponent],
                providers: []
            })
                .overrideTemplate(Nm_EtatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Nm_EtatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Nm_EtatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Nm_Etat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nm_Etats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
