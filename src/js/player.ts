import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";

export class Player implements GameObject
{   
    public position:Vector 
    private gameEngine:GameEngine;

    private speed:number = 100;
    public height:number = 30;
    public width:number =10;
    public playerPoints: number;

    public defaultPosition:Vector;

    constructor(position:Vector, gameEngine:GameEngine)
    {
        this.position = position;
        this.defaultPosition = position;
        this.gameEngine = gameEngine;
    }

    update(time: number): void {
        if (this.gameEngine.aKey)
        {
            //move down
            this.position.y += time/1000 * this.speed 
        }
        if (this.gameEngine.qKey)
        {
            //move up
            this.position.y -= time/1000 * this.speed
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    onColliosion(other: GameObject): void {
        // not doing anything at the moment...
    }
}