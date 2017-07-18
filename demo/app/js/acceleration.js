"use strict";
define('acceleration', () => {
  var move = undefined;
  var draw = undefined;
  var printMap = undefined;
  var canvas, ctx;
  var size = 300;
  var fieldSize = size / 8;
  var playerPosition = { x: 0, y: 0 };

  var free = 0;
  var wall = 1;
  var player = 2;
  var level;

  var codes = [];
  codes[38] = "up";
  codes[40] = "down";
  codes[37] = "left";
  codes[39] = "right";

  var playerAt = playerPosition;

  draw = function draw() {
    ctx.fillStyle = "darkgray";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(playerPosition.x * fieldSize, playerPosition.y * fieldSize, fieldSize, fieldSize);

    printMap();
    return true;
  };
  var onKeyDown = function onKeyDown(e) {
    var code = codes[e.keyCode] ? codes[e.keyCode] : e.target.className;

    move(code) && draw() && setTimeout(function () {
      Array.from(document.querySelectorAll(".btnWrap button")).forEach(function (el) {
        return el.classList.remove("active");
      });
      return true;
    }, 400) && document.querySelector('.' + code).classList.add("active");
    setTimeout(function () {
      return document.querySelector('.' + code).blur();
    }, 400);
  };

  Array.from(document.querySelectorAll("button")).forEach(function (el) {
    return el.addEventListener("click", onKeyDown, false);
  });

  window.addEventListener("keydown", onKeyDown);
  move = function move(direction) {
    //console.log("moving", direction);
    var current = JSON.parse(JSON.stringify(playerPosition));

    var hasMoved = false;
    switch (direction) {
      case "up":
        if (playerPosition.y > 0 && level[playerPosition.y - 1] && level[playerPosition.y - 1][playerPosition.x] === free) {
          --playerPosition.y;
          hasMoved = true;
        }
        break;
      case "down":
        if (playerPosition.y < level.length - 1 && level[playerPosition.y + 1] && level[playerPosition.y + 1][playerPosition.x] === free) {
          ++playerPosition.y;
          hasMoved = true;
        }
        break;
      case "left":
        if (playerPosition.x > 0 && level[playerPosition.y][playerPosition.x - 1] === free) {
          --playerPosition.x;
          hasMoved = true;
        }
        break;
      case "right":
        if (playerPosition.x < level[playerPosition.y].length - 1 && level[playerPosition.y][playerPosition.x + 1] === free) {
          ++playerPosition.x;
          hasMoved = true;
        }
        break;
    }

    if (hasMoved) {
      level[current.y][current.x] = free;
      level[playerPosition.y][playerPosition.x] = player;
      playerAt = playerPosition;
      //console.clear();
      console.log("Player has moved " + direction);
    }
    return hasMoved;
  };

  var printMap = function printMap() {
    //var x, y;
    //x=0, y=0;
    var str = "";

    var info = "Player at " + playerAt.y + " " + playerAt.x + "\n <br>";

    for (var _iterator = level, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var row = _ref;

      str += row.toString().split(",").join("  ") + "\n <br>";
    }
    //console.log(info + str);
    document.querySelector(".info.button .innerText").innerHTML = info + str.replace(/0/gi, '<b class="zero" style="color:#bbb;">0</b>').replace("2", '<b style="color:darkgreen;">2</b>');
    return info + str;
  };

  //move();
  //draw();
  //console.clear();
  document.querySelector(".up").focus();
  setTimeout(function (el) {
    el.classList.remove("active"), el.blur();
    document.querySelector(".info.button").focus();
    document.querySelector(".overlay").classList.add("hidden");
    //document.querySelector('.info.button').innerHTML += '<br>' + printMap();
  }, 500, document.querySelector(".up"));
  document.querySelector(".info.button").addEventListener("click", function (e) {
    e.target.classList.add("active");
  }, false);
  console.log("Legend:\n player is 2,\nfield free-to-go is 0,\nno-go is 1");
  //printMap();

  return {
    draw: draw,
    printMap: printMap,
    move: move,
    setCanvas: el => {
      canvasElement = el;
      ctx = canvasElement.getContext('2d');
    },
    setLevel: (matrix) => {
      level = matrix;
    }
  }
});