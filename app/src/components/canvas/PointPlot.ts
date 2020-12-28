export class PointPlot {
    private readonly parent: Element;
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private xProducer: (d: any) => number = () => 0;
    private yProducer: (d: any) => number = () => 0;
    private minX: number = 0;
    private maxX: number = 1;
    private minY: number = 0;
    private maxY: number = 1;
    private scaleX: number = 1;
    private scaleY: number = 1;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;
        this.canvas.height = 200;

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        parent.appendChild(this.canvas);
    }

    plotTitle(plotTitle: string) {
        return this;
    }

    yAxisLabel(amplitude: string) {
        return this;
    }

    xAxisLabel(time: string) {
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
        this.scaleX = this.canvas.width / (this.maxX - this.minX);
        return this;
    }

    range(minY: number, maxY: any) {
        this.minY = minY;
        this.maxY = maxY;
        this.scaleY = this.canvas.height / (this.maxY - this.minY);
        return this;
    }

    position(xProducer: (d: any) => number, yProducer: (d: any) => number) {
        this.xProducer = xProducer;
        this.yProducer = yProducer;
        return this;
    }

    update(values: any[]) {
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'black';
        values.forEach(this.plotPoint);
    }

    plotPoint = (value: any) => {
        const xPosition = this.xProducer(value);
        const yPosition = this.yProducer(value);
        this.ctx.fillRect(this.translateX(xPosition), this.translateY(yPosition), 1, 1);
    }

    private translateX(xPosition: number) {
        return (xPosition - this.minX) * this.scaleX;
    }

    private translateY(yPosition: number) {
        const rawY = (yPosition - this.minY) * this.scaleY;
        return this.canvas.height - rawY;
    }
}