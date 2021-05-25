import { ChartDataSets, ChartType } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";

export class chart {
    public chartData: any
    public chartLabels: string[]
    public chartOptions: any
    public chartColors: Color[]
    public chartLegend: boolean
    public chartPlugins: any[]
    public chartType: ChartType
}