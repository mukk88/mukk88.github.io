<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-navigation-drawer floating expand-on-hover rail theme="dark" permanent>
      <v-list>
        <v-list-item href="/" prepend-avatar="personPhoto.jpg" subtitle="markwoo@gmailcom" title="Mark Woo"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item href="/dice" prepend-icon="mdi-dice-3" title="Dice" value="dice"></v-list-item>
        <v-list-item href="/food" prepend-icon="mdi-food" title="Food" value="food"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<style scoped></style>
