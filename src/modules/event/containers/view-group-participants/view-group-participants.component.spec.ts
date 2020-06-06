import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import { CreateEventComponent } from './create-event.component';

@Component({})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

// describe('Error401Component', () => {
//     let fixture: ComponentFixture<TestHostComponent>;
//     let hostComponent: TestHostComponent;
//     let hostComponentDE: DebugElement;
//     let hostComponentNE: Element;

//     let component: CreateEventComponent;
//     let componentDE: DebugElement;
//     let componentNE: Element;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [TestHostComponent, CreateEventComponent],
//             imports: [NoopAnimationsModule],
//             providers: [],
//             schemas: [NO_ERRORS_SCHEMA],
//         }).compileComponents();

//         fixture = TestBed.createComponent(TestHostComponent);
//         hostComponent = fixture.componentInstance;
//         hostComponentDE = fixture.debugElement;
//         hostComponentNE = hostComponentDE.nativeElement;

//         componentDE = hostComponentDE.children[0];
//         component = componentDE.componentInstance;
//         componentNE = componentDE.nativeElement;

//         fixture.detectChanges();
//     });

//     it('should display the component', () => {
//         expect(hostComponentNE.querySelector('sb-error-401')).toEqual(jasmine.anything());
//     });
// });
