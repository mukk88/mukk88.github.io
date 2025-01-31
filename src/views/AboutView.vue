<script setup lang="ts">
import $ from "jquery";

$(document).ready(function () {
  var speed = 10;
  var shaking = false;
  var height = 200;
  var pos = {};
  var dicetotal = 2;

  for (var i = 3; i < 7; i++) {
    $('#area' + i).hide();
  }

  for (var i = 1; i < 7; i++) {
    pos["#cube" + i] = {};
    pos['#cube' + i].topp = 100;
    pos['#cube' + i].leftt = 100;
  }

  var addDice = function () {
    if (dicetotal >= 6) {
      return;
    }
    dicetotal++;
    $('#area' + dicetotal).show();
  };

  var loseDice = function () {
    if (dicetotal <= 0) {
      return;
    }
    $('#area' + dicetotal).hide();
    dicetotal--;
  };

  var rotateCube = function (data, topp, left) {

    shaking = true;

    //rotate
    data.X += data.rotation * data.xm;
    data.Y += data.rotation * data.ym;
    data.Z += data.rotation * data.zm;
    data.X = data.X % 360;
    data.Z = data.Z % 360;
    data.Y = data.Y % 360;
    data.rotation = data.rotation > 0 ? data.rotation - 0.05 : 0;
    $(data.cubenum).css("transform", "rotateX(" + data.X + "deg) rotateY(" + data.Y + "deg) rotateZ(" + data.Z + "deg)");

    //shift
    if (topp >= height || topp <= -1) {
      data.topChange *= -1;
    }
    if (left >= height || left <= -1) {
      data.leftChange *= -1;
    }
    topp += data.topChange;
    left += data.leftChange;
    $(data.cubenum).css("top", topp + 'px');
    $(data.cubenum).css("left", left + 'px');

    //continue
    if (data.rotation > 1.2) {
      setTimeout(function () { rotateCube(data, topp, left) }, speed);
    } else {
      var stopCubeData = {};
      stopCubeData.cubenum = data.cubenum;
      stopCubeData.X = data.X;
      stopCubeData.Y = data.Y;
      stopCubeData.Z = data.Z;
      stopCubeData.rX = data.rotation;
      stopCubeData.rY = data.rotation;
      stopCubeData.rZ = data.rotation;
      pos[data.cubenum].topp = topp;
      pos[data.cubenum].leftt = left;
      setTimeout(function () { stopCube(stopCubeData) }, speed);
    }
  };

  var stopCube = function (data) {
    data.X += data.rX;
    data.Y += data.rY;
    data.Z += data.rZ;
    var curX = data.X % 90;
    var curY = data.Y % 90;
    var curZ = data.Z % 90;
    $(data.cubenum).css("transform", "rotateX(" + data.X + "deg) rotateY(" + data.Y + "deg) rotateZ(" + data.Z + "deg)");

    if (curY < 1) {
      data.rY = 0;
    }
    if (curZ < 1) {
      data.rZ = 0;
    }
    if (curX < 1) {
      data.rX = 0;
    }
    if (curX > 1 || curY > 1 || curZ > 1) {
      setTimeout(function () { stopCube(data) }, speed);
    } else {
      shaking = false;
    };
  };

  var startShake = function () {
    if (shaking) {
      return;
    }
    // X = 0;
    // Y = 0;
    // Z = 0;
    // rotation = 8;
    // speed = 10;
    randomRotateCube('#cube1');
    randomRotateCube('#cube2');
    randomRotateCube('#cube3');
    randomRotateCube('#cube4');
    randomRotateCube('#cube5');
    randomRotateCube('#cube6');
  };

  var randomRotateCube = function (cubenum) {
    var rotationCubeData = {};
    rotationCubeData.X = 0;
    rotationCubeData.Y = 0;
    rotationCubeData.Z = 0;
    rotationCubeData.rotation = 6;
    rotationCubeData.topChange = 1.2 * Math.random();
    rotationCubeData.leftChange = 1.8 * Math.random();
    rotationCubeData.ym = 1 + Math.random();
    rotationCubeData.xm = 1 + Math.random();
    rotationCubeData.zm = 1 + Math.random();
    rotationCubeData.cubenum = cubenum;

    rotateCube(rotationCubeData, pos[cubenum].topp, pos[cubenum].leftt);
  };


  window.addEventListener("devicemotion", function (event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    var threshold = 12;
    if ((x > threshold || y > threshold || z > threshold) && !shaking) {
      startShake();
    }
  }, true);

  $('#start').click(startShake);
  $('#add').click(addDice);
  $('#minus').click(loseDice);
});
</script>
<template>
  <div>

    <div class="area" id="area1">
      <div class="cube" id="cube1">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <div class="area" id="area2">
      <div class="cube" id="cube2">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <div class="area" id="area3">
      <div class="cube" id="cube3">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <div class="area" id="area4">
      <div class="cube" id="cube4">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <div class="area" id="area5">
      <div class="cube" id="cube5">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <div class="area" id="area6">
      <div class="cube" id="cube6">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
    <button id="start">Roll!</button>
    <button id="add">Add Die!</button>
    <button id="minus">Lose Die!</button>
  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */

.area {
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  -webkit-perspective-origin: 50% 50%;
  -moz-perspective-origin: 50% 50%;
  -ms-perspective-origin: 50% 50%;
  position: absolute;
  height: 300px;
  width: 300px;
  /*border: 1px solid;*/
}

#area1 {
  top: 100px;
  left: 0px;
}

#area2 {
  top: 100px;
  left: 300px;
}

#area3 {
  top: 400px;
  left: 0px;
}

#area4 {
  top: 400px;
  left: 300px;
}

#area5 {
  top: 100px;
  left: 600px;
}

#area6 {
  top: 400px;
  left: 600px;
}

.cube {
  position: absolute;
  top: 100px;
  left: 100px;
  height: 100px;
  width: 100px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
}

.side {
  height: 90px;
  width: 90px;
  border: 5px rgba(215, 215, 215, 1) solid;
  position: absolute;
  border-radius: 10px;
  background-color: rgba(215, 215, 215, 1);
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
}

.side.front {
  -webkit-transform: rotateY(0deg) translateZ(50px);
  -moz-transform: rotateY(0deg) translateZ(50px);
  -ms-transform: rotateY(0deg) translateZ(50px);
  background-image: url("/dice-1-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}


.side.back {
  -webkit-transform: rotateY(180deg) rotateZ(-90deg) translateZ(50px);
  -moz-transform: rotateY(180deg) rotateZ(-90deg) translateZ(50px);
  -ms-transform: rotateY(180deg) rotateZ(-90deg) translateZ(50px);
  background-image: url("/dice-6-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}

.side.bottom {
  -webkit-transform: rotateX(-90deg) translateZ(50px);
  -moz-transform: rotateX(-90deg) translateZ(50px);
  -ms-transform: rotateX(-90deg) translateZ(50px);
  background-image: url("/dice-2-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}

.side.top {
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(50px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(50px);
  -ms-transform: rotateX(90deg) rotateZ(90deg) translateZ(50px);
  background-image: url("/dice-5-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}

.side.right {
  -webkit-transform: rotateY(90deg) rotateZ(-90deg) translateZ(50px);
  -moz-transform: rotateY(90deg) rotateZ(-90deg) translateZ(50px);
  -ms-transform: rotateY(90deg) rotateZ(-90deg) translateZ(50px);
  background-image: url("/dice-3-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}

.side.left {
  -webkit-transform: rotateY(-90deg) translateZ(50px);
  -moz-transform: rotateY(-90deg) translateZ(50px);
  -ms-transform: rotateY(-90deg) translateZ(50px);
  background-image: url("/dice-4-md.png");
  background-size: 100%;
  z-index: 1;
  border: 5px rgba(255, 255, 255, 1) solid;
  -webkit-backface-visibility: hidden;
}

button {
  padding: 0.5em 1em;
  margin-left: 2em;
  z-index: 2;
  margin-top: 50px;
  font-size: 1.2em;
}
</style>
