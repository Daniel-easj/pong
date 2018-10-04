import { GameObject } from "./gameObject";
import { Framerate } from "./framerate";
import { Vector } from "./vector";
import { Player } from "./player";
import { Player2 } from "./player2";
import { Ball } from "./ball";

/*
    THis is the main PONG GAME script
*/

export class GameEngine
{

    // items in the game
    public ball:Ball;
    public player1:Player;
    public player2:Player2;
 
    // canvas info
    public canvasWidth:number;
    public canvasHeight:number;

    // keep track of key states
    public aKey:boolean;
    public qKey:boolean;

    public oKey:boolean;
    public lKey:boolean;

    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    
    // array with all gameobjects in the game - If you want more objects in the game add them to this array!
    public objects:GameObject[] = new Array<GameObject>();

    // kepp track of time between loops
    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    public score:number;

    


    constructor()
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        let element: HTMLDivElement = <HTMLDivElement> document.getElementById("score");
        //element.innerHTML = this.score;

        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        // listen for keyboard input
        document.addEventListener('keyup', this.keyUp.bind(this));
        document.addEventListener('keydown', this.keyDown.bind(this));

        //ceate gameobjects
        //this.objects.push(new Framerate(new Vector(10,10)));
        
        this.player1 = new Player(new Vector(10, 10), this);
        this.objects.push(this.player1);

        this.player2 = new Player2(new Vector(270,10), this)
        this.objects.push(this.player2);

        this.ball = new Ball(new Vector(this.canvasWidth/2, this.canvasHeight/2), this);
        this.objects.push(this.ball);

        this.gameLoop();
    }

    // Resets objects position
    private resetGameObjects():void{
        this.player1.position = this.player1.defaultPosition;
        this.player2.position = this.player2.defaultPosition;
        
        this.ball.position = this.ball.defaultPosition;
    }

    // keyboard event
    private keyDown(event:KeyboardEvent): void
    {
        if (event.repeat) {return};
        switch (event.key) {
            case "a":
                this.aKey = true;
                break;
            case "q":
                this.qKey = true;
                break;
            case "l":
                this.oKey = true;
                break;
            case "o":
                this.lKey = true;
        }
    }

    // keyboard event
    private keyUp(event: KeyboardEvent): void
    {
        switch (event.key) {
            case "a":
                this.aKey=false;
                break;
            case "q":
                this.qKey=false;
                break;
                case "l":
                this.oKey = false;
                break;
            case "o":
                this.lKey = false;
        }   
    } 
    
    // a very good explanation of how rectangular collision works: https://silentmatt.com/rectangle-intersection/
    private Collide(a:GameObject, b:GameObject): boolean {
        if (a.position.x < (b.position.x+b.width) &&
            (a.position.x+a.width) > b.position.x &&
            a.position.y < (b.position.y+a.height) &&
            a.position.y+b.height > b.position.y)
            {
                return true;
            }
        
    }

    // the main game loop
    private gameLoop()
    {
        // clear the screen in every update
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow-this.timeZero;
        this.timeZero=this.timeNow;

        // run throght all objects
        this.objects.forEach(element => {
            //all objects are testeted for collisions on all objects
            this.objects.forEach(other => {  
                if (element !== other)
                {
                    if (this.Collide(element, other))
                    {
                        element.onColliosion(other);
                    }
                }
            });
            
            //every element is updated
            element.update(time);

            // every element is drawn on canvas
            element.draw(this.ctx);
        });

        if(this.ball.position.x > this.player1.position.x -8){
            this.resetGameObjects();
            this.player1.playerPoints++;
            this.score++;
        }

        if(this.ball.position.x < this.player2.position.x + 8){
            this.resetGameObjects();
            this.player2.playerPoints++;
            this.score++;
        }

        // call the main gamelop again (~60fps by default)
        window.requestAnimationFrame(this.gameLoop.bind(this));
        
        



    }
}

//start gameengine
new GameEngine();

