const EMPTY = 0;
const SHIP = 1;
const MISS = 2;
const HIT = 3;

class Styles {
    isActive: boolean = false;
    active: string[];
    inactive: string[];

    constructor() {
        this.active   = ["#e9e9e9", "#69e8ff", "#a9a9a9", "#ff5d5d"];
        this.inactive = ["#bcbcbc", "#1aaec9", "#6b6b6b", "#c91d1d"];
    }

    color(cell: number) {
        if (this.isActive == true) {
            return this.active[cell];
        } else {
            return this.inactive[cell];
        }
    }
}

class Listener {
    eventType: string;
    func: (...parameters: any[]) => void;

    constructor(eventType: string, func: (...parameters: any[]) => void) {
        this.eventType = eventType;
        this.func = func;
    }
}

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private offset: number[];

    private cellSize: number;
    private canvasSize: number[];
    private gridSize: number;
    private grid: number[][] = [];
    private styles: Styles;

    private isActive: boolean = false;
    private isOwn: boolean;

    private eventListeners: Listener[] = [];

    constructor(canvas: HTMLCanvasElement, isOwn: boolean) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.isOwn = isOwn;

        this.init();
        this.update();
    }

    setActive(bool: boolean) {
        this.isActive = bool;
        this.styles.isActive = bool;
    }

    addEventListener(eventType: string, func: (...parameters: any[]) => void) {
        let listener = new Listener(eventType, func);
        this.eventListeners.push(listener);
    }

    private event(eventType: string, parameters: any[]) {
        this.eventListeners.forEach(listener => {
            if (listener.eventType == eventType) {
                listener.func(...parameters);
            }
        });
    }

    private update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGrid();

        requestAnimationFrame(this.update.bind(this));
    } 

    private init() {
        this.canvas.addEventListener('click', this.handleMouseClick.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

        this.cellSize = 40;
        this.offset = [10, 10];
        this.canvasSize = [
            this.canvas.width - this.offset[0] * 2,
            this.canvas.height - this.offset[1] * 2
        ];
        this.gridSize = 10;

        for (let x = 0; x < this.gridSize; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSize; y++) {
                this.grid[x][y] = 0;
            }
        }

        this.styles = new Styles();

        // TODO: add field creation later
        this.grid[2][2] = SHIP;
        this.grid[2][3] = SHIP;
        this.grid[3][2] = MISS;
        this.grid[3][3] = MISS;
        this.grid[4][2] = HIT;
        this.grid[4][3] = HIT;
    }

    setShips(ships: number[][]) {
        ships.forEach(ship => {
            let [x, y] = ship;
            this.grid[x][y] = SHIP;
        });
    }

    private drawGrid() {
        const gridSize = this.gridSize;
        const cellSize = this.cellSize;
        let ctx = this.ctx;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                let cell = this.grid[x][y];
                ctx.fillStyle = this.styles.color(cell);
                ctx.fillRect(
                    this.offset[0] + cellSize * x,
                    this.offset[1] + cellSize * y,
                    cellSize, cellSize
                )
            }
        }

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

    private handleMouseClick(event: MouseEvent) {
        if (this.isOwn == true) return;

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

        this.event("click", [clickedCol, clickedRow]);
    }
    
    getCell(x: number, y: number): number {
        try {
            return this.grid[x][y];
        } catch (err) {}
    }

    private handleMouseMove(event: MouseEvent) {}

    private mousePosOnGrid(): number[] | null {
        let mx = mousePos[0] - this.canvas.offsetLeft - this.offset[0];
        let my = mousePos[1] - this.canvas.offsetTop - this.offset[1];
        mx = Math.floor(mx / this.cellSize);
        my = Math.floor(my / this.cellSize);
        if (
            mx < 0 || my < 0 ||
            mx >= this.gridSize ||
            my >= this.gridSize) return;
        return [mx, my];
    }
}
