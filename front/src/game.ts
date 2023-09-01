class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cellSize: number;
    offset: number[];
    canvasSize: number[];
    gridSize: number;

    constructor() {
        this.canvas = document.querySelector('#gameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.init();
        this.update();
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGrid();
        // this.drawShips();
        // this.drawShots();

        requestAnimationFrame(this.update.bind(this));
    } 

    init() {
        this.canvas.addEventListener('click', this.handleMouseClick.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

        this.cellSize = 40;
        this.offset = [10, 10];
        this.canvasSize = [
            this.canvas.width - this.offset[0] * 2,
            this.canvas.height - this.offset[1] * 2
        ];
        this.gridSize = 10;
    }

    drawGrid() {
        const gridSize = this.gridSize;
        const cellSize = this.cellSize;
        let ctx = this.ctx;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                ctx.strokeRect(
                    this.offset[0] + cellSize * row,
                    this.offset[1] + cellSize * col,
                    cellSize, cellSize
                )
            }
        }
    }

    handleMouseClick(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - this.offset[0];
        const mouseY = event.clientY - rect.top - this.offset[1];

        let cellSize = this.cellSize
        const clickedRow = Math.floor(mouseY / cellSize);
        const clickedCol = Math.floor(mouseX / cellSize);

        if (
            clickedCol < 0 ||
            clickedRow < 0 ||
            clickedCol >= this.gridSize ||
            clickedRow >= this.gridSize) return;

        document.querySelector("#messageLog").textContent = `${clickedRow} ${clickedCol}`;
    }
    
    handleMouseMove(event: MouseEvent) {
        document.querySelector("#messageLog").textContent = `${mousePos}`;
    }

    isMouseOnGrid(): boolean {
        let mx = mousePos[0] - this.canvas.offsetLeft - this.offset[0];
        let my = mousePos[1] - this.canvas.offsetTop - this.offset[1];
        return mx >= 0 && my >= 0 && mx <= this.canvas.width - this.offset[0] * 2 && my <= this.canvas.height - this.offset[1] * 2
    }
}

const game = new Game();