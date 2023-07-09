<template>
  <h1 class="px-5 pt-5">All Brand</h1>
  <v-btn
    v-if="!brandStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-plus"
    color="green-darken-4"
    @click="brandStore.showFormCreate = true"
  >
    Add Brand
  </v-btn>
  <v-btn
    v-if="brandStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-close"
    color="grey-darken-2"
    @click="brandStore.showFormCreate = false"
  >
    Close
  </v-btn>
  <v-form @submit.prevent="brandStore.addBrand">
    <v-row v-if="brandStore.showFormCreate" class="px-5 my-5" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="brandStore.addData.name"
          label="Name Brand"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-form @submit.prevent="brandStore.updateBrand(brandStore.editData.id)">
    <v-row v-if="brandStore.showFormEdit" class="px-5 my-5" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="brandStore.editData.name"
          label="Name Brand"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
        <v-btn
          @click="brandStore.showFormEdit = false"
          type="button"
          color="grey-darken-2"
          class="ms-2"
          >Close</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
  <v-table class="px-5">
    <thead>
      <tr>
        <th class="text-left">No</th>
        <th class="text-left">Name</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(itm, i) in brandStore.data" :key="itm.id">
        <td>{{ i + 1 }}</td>
        <td>{{ itm.name }}</td>
        <td>
          <v-btn
            @click="brandStore.openFormEdit(itm.id)"
            class="me-2"
            prepend-icon="mdi:mdi-pen"
            color="yellow-darken-4"
            >Edit
          </v-btn>
          <v-btn
            @click="brandStore.deleteBrand(itm.id)"
            class="me-2"
            prepend-icon="mdi:mdi-delete"
            color="red-darken-4"
            >Delete
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { useBrandStore } from "../../store/brand-store";
export default {
  setup() {
    const brandStore = useBrandStore();
    return { brandStore };
  },
  async mounted() {
    await this.brandStore.getData();
  },
};
</script>
