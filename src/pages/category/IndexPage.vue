<template>
  <h1 class="px-5 pt-5">All Category</h1>
  <v-btn
    v-if="!categoryStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-plus"
    color="green-darken-4"
    @click="categoryStore.showFormCreate = true"
  >
    Add Category
  </v-btn>
  <v-btn
    v-if="categoryStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-close"
    color="grey-darken-2"
    @click="categoryStore.showFormCreate = false"
  >
    Close
  </v-btn>
  <v-form @submit.prevent="categoryStore.addCategory">
    <v-row v-if="categoryStore.showFormCreate" class="px-5 my-5" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="categoryStore.addData.name"
          label="Nama Brand"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-form
    @submit.prevent="categoryStore.updateCategory(categoryStore.editData.id)"
  >
    <v-row v-if="categoryStore.showFormEdit" class="px-5 my-5" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="categoryStore.editData.name"
          label="Nama Brand"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
        <v-btn
          @click="categoryStore.showFormEdit = false"
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
      <tr v-for="(ctg, i) in categoryStore.data" :key="ctg.id">
        <td>{{ i + 1 }}</td>
        <td>{{ ctg.name }}</td>
        <td>
          <v-btn
            @click="categoryStore.openFormEdit(ctg.id)"
            class="me-2"
            prepend-icon="mdi:mdi-pen"
            color="yellow-darken-4"
            >Edit
          </v-btn>
          <v-btn
            @click="categoryStore.deleteCategory(ctg.id)"
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
import { useCategoryStore } from "../../store/category-store";
export default {
  setup() {
    const categoryStore = useCategoryStore();
    return { categoryStore };
  },
  async mounted() {
    await this.categoryStore.getData();
  },
};
</script>
