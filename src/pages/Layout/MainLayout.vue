<template>
  <v-layout>
    <v-app-bar color="green-darken-3" density="compact">
      <v-app-bar-title>E-Mart Applicaton</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-row class="mx-5 mt-5" justify="center">
        <v-col cols="6" sm="2">
          <router-link class="link" :to="{ name: 'dashboard' }">
            <v-btn
              prepend-icon="mdi:mdi-home"
              type="button"
              color="green-darken-4"
              block
              >Dashboard</v-btn
            >
          </router-link>
        </v-col>
        <v-col cols="6" sm="2">
          <router-link class="link" :to="{ name: 'brand-index' }">
            <v-btn
              prepend-icon="mdi:mdi-microsoft-office"
              type="button"
              color="green-darken-4"
              block
              >Brand</v-btn
            >
          </router-link>
        </v-col>
        <v-col cols="6" sm="2">
          <router-link class="link" :to="{ name: 'category-index' }">
            <v-btn
              prepend-icon="mdi:mdi-tag"
              type="button"
              color="green-darken-4"
              block
              >Category</v-btn
            >
          </router-link>
        </v-col>
        <v-col cols="6" sm="2">
          <router-link class="link" :to="{ name: 'item-index' }">
            <v-btn
              prepend-icon="mdi:mdi-package"
              type="button"
              color="green-darken-4"
              block
              >Items</v-btn
            >
          </router-link>
        </v-col>
      </v-row>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped>
.link {
  text-decoration: none;
}
</style>
