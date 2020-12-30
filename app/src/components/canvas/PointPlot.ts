import { calculateDefaultTicks } from "@wounded-pixels/eda";

export class PointPlot {
    private readonly parent: Element;
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private xProducer: (d: any) => number = () => 0;
    private yProducer: (d: any) => number = () => 0;
    private plotTitleValue: string = '';
    private minX: number = 0;
    private maxX: number = 1;
    private minY: number = 0;
    private maxY: number = 1;
    private scaleX: number = 1;
    private scaleY: number = 1;
    private topPadding: number = 15;
    private bottomPadding: number = 33;
    private leftPadding: number = 30;
    private rightPadding: number = 0;
    private textHeight: number = 14;
    private xAxisLabelValue: string = '';
    private yAxisLabelValue: string = '';

    constructor(parent: HTMLElement, width: number, height: number) {
        this.parent = parent;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        parent.appendChild(this.canvas);
    }

    calculatePlotHeight() {
        return this.canvas.height - this.topPadding - this.bottomPadding;
    }

    calculatePlotWidth() {
        return this.canvas.width - this.leftPadding - this.rightPadding;
    }

    plotTitle(plotTitle: string) {
        this.plotTitleValue = plotTitle;
        return this;
    }

    yAxisLabel(value: string) {
        this.yAxisLabelValue = value;
        return this;
    }

    xAxisLabel(value: string) {
        this.xAxisLabelValue = value;
        return this;
    }

    radius(number: number) {
        return this;
    }

    fill(black: string) {
       return this;
    }

    stroke(none: string) {
        return this;
    }

    domain(minX: any, maxX: any) {
        this.minX = minX;
        this.maxX = maxX;
        this.scaleX = this.calculatePlotWidth() / (this.maxX - this.minX);
        return this;
    }

    range(minY: number, maxY: any) {
        this.minY = minY;
        this.maxY = maxY;
        this.scaleY = this.calculatePlotHeight() / (this.maxY - this.minY);
        return this;
    }

    position(xProducer: (d: any) => number, yProducer: (d: any) => number) {
        this.xProducer = xProducer;
        this.yProducer = yProducer;
        return this;
    }

    update(values: any[]) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#d0d0d0';
        this.ctx.fillRect(
            this.translateX(this.minX), this.translateY(this.maxY),
            this.calculatePlotWidth(), this.calculatePlotHeight()
        );

        this.ctx.strokeStyle = 'white';
        const xTickValues = calculateDefaultTicks(this.minX, this.maxX);
        const yTickValues = calculateDefaultTicks(this.minY, this.maxY)
        xTickValues.forEach(this.drawVerticalLine);
        yTickValues.forEach(this.drawHorizontalLine);

        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        this.plotPoints(values);

        this.ctx.font = '12px sans-serif';
        this.ctx.textBaseline = 'bottom';
        xTickValues.forEach(this.drawXTickLabel);
        yTickValues.forEach(this.drawYTickLabel);

        this.ctx.fillText(
            this.plotTitleValue,
            this.canvas.width * 0.25,
            this.topPadding - 3,
            this.canvas.width * 0.7);

        this.ctx.fillText(
            this.xAxisLabelValue,
            this.canvas.width * 0.5,
            this.canvas.height - 4,
            this.canvas.width * 0.5);

        this.drawVerticalText(
            this.textHeight * 1.05,
            this.topPadding + this.calculatePlotHeight()*0.75,
            this.yAxisLabelValue);
    }

    drawXTickLabel = (xValue: number) => {
        this.ctx.fillText(''+xValue, this.translateX(xValue) - 3, this.topPadding + this.calculatePlotHeight() + this.textHeight + 3);
    }

    drawYTickLabel = (yValue: number) => {
        this.ctx.fillText(yValue.toString().padStart(2, ' '), this.textHeight, this.translateY(yValue) + this.textHeight/3);
    }

    drawVerticalText(xPosition: number, yPosition: number, text: string) {
        this.ctx.save();
        this.ctx.translate(xPosition, yPosition);
        this.ctx.rotate(-Math.PI/2);
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }

    drawVerticalLine = (xValue: number) => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.translateX(xValue), this.translateY(this.minY));
        this.ctx.lineTo(this.translateX(xValue), this.translateY(this.maxY));
        this.ctx.stroke();
    }

    drawHorizontalLine = (yValue: number) => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.translateX(this.minX), this.translateY(yValue));
        this.ctx.lineTo(this.translateX(this.maxX), this.translateY(yValue));
        this.ctx.stroke();
    }

    plotPoints = (values: any[]) => {
        const initialX = this.xProducer(values[0]);
        const initialY = this.yProducer(values[0]);

        this.ctx.beginPath();
        this.ctx.moveTo(
            this.translateX(initialX),
            this.translateY(initialY)
        );

        for (let index = 1; index < values.length; index++) {
            const rawX = this.xProducer(values[index]);
            const rawY = this.yProducer(values[index]);
            this.ctx.lineTo(this.translateX(rawX), this.translateY(rawY));
        }

        this.ctx.stroke();
    }

    private translateX(xPosition: number) {
        return this.leftPadding + (xPosition - this.minX) * this.scaleX;
    }

    private translateY(yPosition: number) {
        const rawY = (yPosition - this.minY) * this.scaleY;
        return this.topPadding + this.calculatePlotHeight() - rawY;
    }
}