<script setup lang="ts">
import { ref, type Ref } from 'vue'

interface LatLon {
  lat: number;
  lon: number;
}

interface FoodInfo {
  name: string;
  price: number; // 1-5
  location: LatLon;
  link: string; // google maps link
  cuisine: string; // chinese, italian, etc
  tags: string[]; // hokkein mee, chicken rice, etc
}

const placesToEat: FoodInfo[] = [
  {
    name: 'Heuvos',
    price: 3,
    location: {
      lat: 1.3045273803650357, lon: 103.86039294010133
    },
    link: 'https://maps.app.goo.gl/GPpiZS65yhjtxucL7',
    cuisine: 'mexican',
    tags: ['taco'],
  },
  {
    name: 'Ban Leong',
    price: 4,
    location: {
      lat: 1.3768910642629928, lon: 103.8280537435849
    },
    link: 'https://maps.app.goo.gl/bRwecokEo3ZQSoCH9',
    cuisine: 'chinese',
    tags: ['crab', 'fried rice', 'hor fun'],
  },
  {
    name: 'Hiang Ji Roasted Holland V',
    price: 1,
    location: {
      lat: 1.310332691595799, lon: 103.7947577528644
    },
    link: 'https://maps.app.goo.gl/sSQr8hZnc6Qkgkdu6',
    cuisine: 'chinese',
    tags: ['duck', 'char siew', 'roasted pork'],
  },
  {
    name: 'Peramakan',
    price: 2,
    location: {
      lat: 1.3149064492658464, lon: 103.85253132327215
    },
    link: 'https://maps.app.goo.gl/XVrrd45Ne8zTzS4E7',
    cuisine: 'peranakan',
    tags: [],
  },
  {
    name: 'Bulgogi Syo',
    price: 2,
    location: {
      lat: 1.2991385733820235, lon: 103.8557731779779
    },
    link: 'https://maps.app.goo.gl/rzxSfzZhNxCaouCn6',
    cuisine: 'korean',
    tags: ['bbq'],
  },
  {
    name: 'Nana dollys',
    price: 2,
    location: {
      lat: 1.3048133718876729, lon: 103.853150338249
    },
    link: 'https://maps.app.goo.gl/fE4Q9ppk4hT7ABcW6',
    cuisine: 'peranakan',
    tags: [],
  },
  {
    name: 'Hand in hand peking duck',
    price: 3,
    location: {
      lat: 1.3332690728900756, lon: 103.74352222475713
    },
    link: 'https://maps.app.goo.gl/4k6iChyD71Vgh6Dm7',
    cuisine: 'chinese',
    tags: ['peking duck'],
  },
  {
    name: 'Hue',
    price: 4,
    location: {
      lat: 1.3114316233119052, lon: 103.85980018242928
    },
    link: 'https://maps.app.goo.gl/xZfu1mFyTipTqfqAA',
    cuisine: 'thai',
    tags: [],
  },
  {
    name: 'Revolver',
    price: 5,
    location: {
      lat: 1.278216649580818, lon: 103.8442286147486
    },
    link: 'https://maps.app.goo.gl/N9KhQ4BW2R5gTagL7',
    cuisine: 'indian',
    tags: [],
  },
  {
    name: 'Lavi taco',
    price: 3,
    location: {
      lat: 1.2850080430584918, lon: 103.84168818428171
    },
    link: 'https://maps.app.goo.gl/GCV11RFccRKrQ2Fk6',
    cuisine: 'mexican',
    tags: ['taco'],
  },




];

const cuisines = [... new Set(placesToEat.map((place) => place.cuisine))];
const tags = [... new Set(placesToEat.map((place) => place.tags).flat())];
let chosenPrices: string[] = []
let chosenTypes: string[] = []
let chosenTags: string[] = []
let chosenPlaces = ref<FoodInfo[]>([])
let findText = ref("Find place")
let currentLocation: LatLon = { lat: 1.3717658172587013, lon: 103.80650175506024 };

function distance(start: LatLon, end: LatLon): number {
  return Math.sqrt((start.lat - end.lat) ** 2 + (start.lon - end.lon) ** 2);
}

function filterPlaces(start: LatLon) {
  let filteredPlaces = placesToEat;
  if (chosenPrices.length !== 0) {
    filteredPlaces = filteredPlaces.filter((place) => chosenPrices.includes('$'.repeat(place.price)));
  }

  if (chosenTypes.length !== 0) {
    filteredPlaces = filteredPlaces.filter((place) => chosenTypes.includes(place.cuisine));
  }

  if (chosenTags.length !== 0) {
    filteredPlaces = filteredPlaces.filter((place) => chosenTags.some((tag) => place.tags.includes(tag)));
  }

  filteredPlaces = filteredPlaces.sort((a, b) => distance(a.location, start) - distance(b.location, start));
  chosenPlaces.value = filteredPlaces.slice(0, 5);

  console.log(filteredPlaces.map((place) => place.name));
  findText.value = "Find place"

}


function findPlace() {
  // get location
  // get other filters

  findText.value = "Finding..."

  // if no geo location, use center of singapore
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = { lat: position.coords.latitude, lon: position.coords.longitude };
      filterPlaces(currentLocation);
    });
  } else {
    filterPlaces(currentLocation);
  }
}

function updatePrices(prices: any) {
  chosenPrices = prices;
}

function updateTypes(types: any) {
  chosenTypes = types;
}

function updateTags(tags: any) {
  chosenTags = tags;
}

function priceStr(price: number) {
  return '$'.repeat(price);
}

function howFar(location: LatLon) {
  return `${(distance(currentLocation, location) * 1000).toPrecision(3)
    } `;
}

</script>


<template>
  <br>
  <h2>Sg food</h2>
  <v-row>
    <v-col cols="auto">
      <v-select label="Price" :items="['$', '$$', '$$$', '$$$$', '$$$$$']" variant="outlined" density="compact"
        min-width="100px" multiple @update:modelValue="updatePrices"></v-select>
    </v-col>
    <v-col cols="auto">
      <v-select label="Type" :items="cuisines" variant="outlined" density="compact" min-width="100px" multiple
        @update:modelValue="updateTypes"></v-select>
    </v-col>
    <v-col cols="auto">
      <v-select label="Tags" :items="tags" variant="outlined" density="compact" min-width="100px" multiple
        @update:modelValue="updateTags"></v-select>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="findPlace()">{{ findText }}</v-btn>
    </v-col>
  </v-row>
  <h2 v-if="chosenPlaces.length">Suggested options</h2>
  <div v-for="place in chosenPlaces">
    <div><a :key="place.name" v-bind:href="place.link"> {{ place.name }}</a> {{ priceStr(place.price) }}</div>
    <div>Distance in straight line: {{ howFar(place.location) }}</div>
  </div>
  <h2>All options</h2>
  <div v-for="place in placesToEat">
    <a v-bind:href="place.link">{{ place.name }} {{ priceStr(place.price) }}</a>
  </div>
</template>

<style>
.v-input__control {
  display: block;
}

.v-col-auto {
  flex: 1 0 auto;
}

.v-row {
  flex: none;
}
</style>