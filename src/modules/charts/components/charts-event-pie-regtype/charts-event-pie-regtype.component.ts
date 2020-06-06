import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Input,
} from '@angular/core';
import { Chart } from 'chart.js';
import { GroupService } from '../../../app-common/services/group.service';

@Component({
    selector: 'sb-charts-event-pie-regtype',
    // // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-pie.component.html',
    styleUrls: ['charts-pie.component.scss'],
})
export class ChartsEventPieRegtypeComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    @Input() eventId: number;
    chart!: Chart;
    hasRegs: boolean = true;
    regTypes;

    constructor(private groupService: GroupService) {
        this.regTypes = groupService.regTypes;
        // regTypes;
    }
    ngAfterViewInit() {}

    ngOnInit() {
        this.groupService
            .getGroups(this.eventId)
            .toPromise()
            .then(val => {
                let totalGroups: number = val.length;
                if (totalGroups > 0) {
                    this.hasRegs = true;
                } else {
                    this.hasRegs = false;
                }
                if (this.hasRegs) {
                    let Individuals: number = 0;
                    val.forEach(f => {
                        if (f.registration_type == this.regTypes.indexOf('Individual')) {
                            Individuals++;
                        }
                    });
                    this.chart = new Chart(this.myPieChart.nativeElement, {
                        type: 'pie',
                        data: {
                            labels: ['Groups', 'Individuals'],
                            datasets: [
                                {
                                    data: [totalGroups - Individuals, Individuals],
                                    backgroundColor: ['#007bff', '#dc3545'],
                                },
                            ],
                        },
                    });
                }
            });
    }
}
