<script setup lang="ts">
import { ref } from 'vue'

let diceTotal = 2;
let speed = 10;
let shaking = false;
let height = 200;

interface DiceData {
  id: number;
  shown: boolean;
  transform: string;
  top: string;
  left: string;
}

const dice = ref([
  { id: 0, shown: true, transform: '', top: '0', left: '0' },
  { id: 1, shown: true, transform: '', top: '0', left: '0' },
  { id: 2, shown: false, transform: '', top: '0', left: '0' },
  { id: 3, shown: false, transform: '', top: '0', left: '0' },
  { id: 4, shown: false, transform: '', top: '0', left: '0' },
  { id: 5, shown: false, transform: '', top: '0', left: '0' },
]);

interface CubeData {
  X: number;
  Y: number;
  Z: number;
  rotation: number;
  topChange: number;
  leftChange: number;
  ym: number;
  xm: number;
  zm: number;
  cubeNum: number;
}

interface StopCubeData {
  X: number;
  Y: number;
  Z: number;
  rX: number;
  rY: number;
  rZ: number;
  cubeNum: number;
}

function randomRotateCube(cubeNum: number) {
  const rotationCubeData: CubeData = {
    X: 0,
    Y: 0,
    Z: 0,
    rotation: 6,
    topChange: 1.2 * Math.random(),
    leftChange: 1.8 * Math.random(),
    ym: 1 + Math.random(),
    xm: 1 + Math.random(),
    zm: 1 + Math.random(),
    cubeNum: cubeNum,
  };
  const top = parseInt(dice.value[cubeNum].top.replace('px', ''));
  const left = parseInt(dice.value[cubeNum].left.replace('px', ''));
  rotateCube(rotationCubeData, top, left);
};

function rotateCube(data: CubeData, top: number, left: number) {
  //rotate
  data.X += data.rotation * data.xm;
  data.Y += data.rotation * data.ym;
  data.Z += data.rotation * data.zm;
  data.X = data.X % 360;
  data.Z = data.Z % 360;
  data.Y = data.Y % 360;
  data.rotation = data.rotation > 0 ? data.rotation - 0.05 : 0;
  console.log(data.X, data.Y, data.Z);
  console.log(data.cubeNum);
  dice.value[data.cubeNum].transform = `rotateX(${data.X}deg) rotateY(${data.Y}deg) rotateZ(${data.Z}deg)`;

  //shift
  if (top >= height || top <= -1) {
    data.topChange *= -1;
  }
  if (left >= height || left <= -1) {
    data.leftChange *= -1;
  }
  top += data.topChange;
  left += data.leftChange;

  dice.value[data.cubeNum].top = `${top}px`;
  dice.value[data.cubeNum].left = `${left}px`;

  //continue
  if (data.rotation > 1.2) {
    setTimeout(function () { rotateCube(data, top, left) }, speed);
  } else {
    const stopCubeData: StopCubeData = {
      cubeNum: data.cubeNum,
      X: data.X,
      Y: data.Y,
      Z: data.Z,
      rX: data.rotation,
      rY: data.rotation,
      rZ: data.rotation,
    };
    stopCubeData.cubeNum = data.cubeNum;
    stopCubeData.X = data.X;
    stopCubeData.Y = data.Y;
    stopCubeData.Z = data.Z;
    stopCubeData.rX = data.rotation;
    stopCubeData.rY = data.rotation;
    stopCubeData.rZ = data.rotation;
    setTimeout(function () { stopCube(stopCubeData) }, speed);
  }
};

function stopCube(data: StopCubeData) {
  data.X += data.rX;
  data.Y += data.rY;
  data.Z += data.rZ;
  const curX = data.X % 90;
  const curY = data.Y % 90;
  const curZ = data.Z % 90;
  dice.value[data.cubeNum].transform = `rotateX(${data.X}deg) rotateY(${data.Y}deg) rotateZ(${data.Z}deg)`;

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


function addDie() {
  if (diceTotal > 5) {
    return;
  }
  diceTotal++;
  dice.value[diceTotal - 1].shown = true;
}

function startShake() {
  console.log('Shaking');
  if (shaking) {
    return;
  }
  shaking = true;

  dice.value.forEach((die, index) => {
    if (die.shown) {
      randomRotateCube(index);
    }
  });
}

function loseDie() {
  if (diceTotal <= 0) {
    return;
  }
  dice.value[diceTotal - 1].shown = false;
  diceTotal--;
}

window.addEventListener("devicemotion", function (event: any) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;
  const threshold = 12;
  if ((x > threshold || y > threshold || z > threshold) && !shaking) {
    startShake();
  }
}, true);

</script>
<template>
  <br>
  <v-row>
    <v-col cols="auto">
      <v-btn @click="startShake()">Roll</v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="addDie()">Add Die</v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="startShake()">Lose Die</v-btn>
    </v-col>
  </v-row>
  <div v-for="die in dice">
    <div v-show="die.shown" class="area" :key="die.id" :id="'area' + die.id">
      <div class="cube" :id="'cube' + die.id">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side bottom"></div>
        <div class="side top"></div>
        <div class="side right"></div>
        <div class="side left"></div>
      </div>
    </div>
  </div>
</template>

<style>
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
}

#area0 {
  top: 100px;
  left: 0px;
}

#cube0 {
  transform: v-bind('dice[0].transform');
  top: v-bind('dice[0].top');
  left: v-bind('dice[0].left');
}

#area1 {
  top: 100px;
  left: 300px;
}

#cube1 {
  transform: v-bind('dice[1].transform');
  top: v-bind('dice[1].top');
  left: v-bind('dice[1].left');
}

#area2 {
  top: 400px;
  left: 0px;
}

#cube2 {
  transform: v-bind('dice[2].transform');
  top: v-bind('dice[2].top');
  left: v-bind('dice[2].left');
}

#area3 {
  top: 400px;
  left: 300px;
}

#cube3 {
  transform: v-bind('dice[3].transform');
  top: v-bind('dice[3].top');
  left: v-bind('dice[3].left');
}

#area4 {
  top: 100px;
  left: 600px;
}

#cube4 {
  transform: v-bind('dice[4].transform');
  top: v-bind('dice[4].top');
  left: v-bind('dice[4].left');
}

#area5 {
  top: 400px;
  left: 600px;
}

#cube5 {
  transform: v-bind('dice[5].transform');
  top: v-bind('dice[5].top');
  left: v-bind('dice[5].left');
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
</style>
