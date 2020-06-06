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

@Component({
    selector: 'sb-charts-pie',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-pie.component.html',
    styleUrls: ['charts-pie.component.scss'],
})
export class ChartsPieComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    // @Input
    chart!: Chart;

    constructor() {}
    ngOnInit() {}

    ngAfterViewInit() {
        this.chart = new Chart(this.myPieChart.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Groups', 'Individuals'],
                datasets: [
                    {
                        data: [15.21, 15.58],
                        backgroundColor: ['#007bff', '#dc3545'],
                    },
                ],
            },
        });
    }
}
