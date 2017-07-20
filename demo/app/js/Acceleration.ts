"use strict";

interface IPlayerPosition { x: number, y: number, z: number }
interface IAcceleration {
  canvas: Element;
  ctx: CanvasRenderingContext2D;
  codes: string[];
  fieldSize: number;
  size: number;
  playerPosition: IPlayerPosition;
  playerAt: IPlayerPosition;
  free: number;
  wall: number;
  player: number;

  // map view
  toggleView: boolean;

  move(direction: string): boolean;
  getPosition(): IPlayerPosition;
  setCanvas(canvas: Element): void;
  setLevel(map: number[][]): void;
  onMove(callback: Function): void;

  draw(): boolean;
  printMap(): void;
}



export default class Acceleration implements IAcceleration {

  size: number;

  PlayerPosition: { x: number, y: number, z: number };
  canvas: Element;
  ctx: CanvasRenderingContext2D;
  codes: string[];
  fieldSize: number;
  playerPosition: IPlayerPosition;
  playerAt: IPlayerPosition;

  private level: number[][];
  private onMoveCallBack: Function;

  free: number;
  wall: number;
  player: number;

  // map view
  toggleView: boolean;

  contructor() {
    this.size = 300;
    this.fieldSize = this.size / 1;
    this.playerPosition = { x: 0, y: 0, z: 0 };

    this.free = 0;
    this.wall = 1;
    this.player = 2;


    this.codes = [];
    this.codes[38] = "up";
    this.codes[40] = "down";
    this.codes[37] = "left";
    this.codes[39] = "right";

    this.playerAt = this.playerPosition;

    Array.from(document.querySelectorAll("button")).forEach(function (el) {

      return el.addEventListener("click", this.onKeyDown, false);
    });

    window.addEventListener("keydown", this.onKeyDown);


    // map view
    this.toggleView = false // window.innerWidth <= 414;
    // collapse map view for desktop and expand for mobile devices having a smaller screen width than 414
    this.onWindowResize(false);


    //move();
    //draw();
    //console.clear();
    document.querySelector(".up").focus();
    setTimeout(function (el) {
      el.classList.remove("active"), el.blur();
      document.querySelector(".info.button").focus();
      document.querySelector(".overlay").classList.add("hidden");
      window.addEventListener('resize', this.onWindowResize);
      //document.querySelector('.info.button').innerHTML += '<br>' + printMap();
    }, 500, document.querySelector(".up"));
    document.querySelector(".info.button").addEventListener('click', function (e) {
      this.toggleView = !this.toggleView
      this.onWindowResize(false)
    }, false);
    console.log("Legend:\n player is 2,\nfield free-to-go is 0,\nno-go is 1");
    //printMap();

  }

  draw() {
    this.ctx.fillStyle = "darkgray";
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.ctx.fillStyle = "lightgreen";
    this.ctx.fillRect(this.playerPosition.x * this.fieldSize, this.playerPosition.y * this.fieldSize, this.fieldSize, this.fieldSize);
    this.printMap();
    return true;
  }

  getPosition() {
    let pos = this.playerAt;
    pos.z = pos.y; // mhh ...
    console.dir(pos);
    return this.playerAt ? pos : this.playerPosition
  }

  onKeyDown(e: KeyboardEvent) {

    var code = this.codes[e.keyCode] ? this.codes[e.keyCode] : e.target.className;
    this.move(code) && this.draw() && setTimeout(function () {

      Array.from(document.querySelectorAll(".btnWrap button")).forEach(function (el) {
        return el.classList.remove("active");
      });
      return true;
    }, 400) && code && document.querySelector('.' + code).classList.add("active");
    setTimeout(function () {
      if (code)
        return document.querySelector('.' + code).blur();
    }, 400);
  }


  move(direction: string) {
    //console.log("moving", direction);
    var current = JSON.parse(JSON.stringify(this.playerPosition));

    var hasMoved = false;
    switch (direction) {
      case "up":
        if (this.playerPosition.y > 0 && this.level[this.playerPosition.y - 1] && this.level[this.playerPosition.y - 1][this.playerPosition.x] === this.free) {
          --this.playerPosition.y;
          hasMoved = true;
        }
        break;
      case "down":
        if (this.playerPosition.y < this.level.length - 1 && this.level[this.playerPosition.y + 1] && this.level[this.playerPosition.y + 1][this.playerPosition.x] === this.free) {
          ++this.playerPosition.y;
          hasMoved = true;
        }
        break;
      case "left":
        if (this.playerPosition.x > 0 && this.level[this.playerPosition.y][this.playerPosition.x - 1] === this.free) {
          --this.playerPosition.x;
          hasMoved = true;
        }
        break;
      case "right":
        if (this.playerPosition.x < this.level[this.playerPosition.y].length - 1 && this.level[this.playerPosition.y][this.playerPosition.x + 1] === this.free) {
          ++this.playerPosition.x;
          hasMoved = true;
        }
        break;
    }

    if (hasMoved) {
      this.level[current.y][current.x] = this.free;
      this.level[this.playerPosition.y][this.playerPosition.x] = this.player;
      this.playerAt = this.playerPosition;
      //console.clear();
      console.log("Player has moved " + direction);
      this.onMoveCallBack();
    }
    return hasMoved;
  }

  onWindowResize(update: boolean) {

    if (update)
      this.toggleView = window.innerWidth <= 414;

    if (this.toggleView)
      document.querySelector('.info.button').classList.add('active')
    else
      document.querySelector('.info.button').classList.remove('active')
  }

  printMap() {
    var str = "";

    var info = "Player at " + this.playerAt.y + " " + this.playerAt.x + "\n <br>";

    for (let row of this.level) {
      str += row.toString().split(",").join("  ") + "\n <br>";
    }
    //console.log(info + str);
    document.querySelector(".info.button .innerText").innerHTML =
      info +
      str
        .replace(/0/gi, '<b class="zero" style="color:#bbb;">0</b>')
        .replace("2", '<b style="color:darkgreen;">2</b>');
    return info + str;
  }

  setCanvas(canvas: Element): void {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  setLevel(map: number[][]) {
    this.level = map;
    this.fieldSize = this.size / this.level[0].length;
  }

  onMove(callback: Function) {
    this.onMoveCallBack = callback;
  }
}
