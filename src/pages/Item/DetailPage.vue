<template>
  <h1 class="px-5 pt-5">Item Detail</h1>
  <v-row no-gutters>
    <v-col cols="12" sm="3" class="px-5 pt-5">
      <v-text-field
        v-model="itemStore.detailData.name"
        label="Name"
        variant="outlined"
        readonly
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="3" class="px-5 pt-5">
      <v-text-field
        v-model="itemStore.detailData.number"
        label="Number"
        variant="outlined"
        readonly
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="3" class="px-5 pt-5">
      <v-text-field
        v-model="itemStore.detailData.brand.name"
        label="Brand"
        variant="outlined"
        readonly
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="3" class="px-5 pt-5">
      <v-text-field
        v-model="itemStore.detailData.category.name"
        label="Category"
        variant="outlined"
        readonly
      ></v-text-field>
    </v-col>
  </v-row>
  <v-btn
    v-if="!itemStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-plus"
    color="green-darken-4"
    @click="itemStore.showFormCreate = true"
  >
    Add Item
  </v-btn>
  <v-btn
    v-if="itemStore.showFormCreate"
    class="mx-5"
    prepend-icon="mdi:mdi-close"
    color="grey-darken-2"
    @click="itemStore.showFormCreate = false"
  >
    Close
  </v-btn>
  <v-form @submit.prevent="itemStore.addVariant">
    <v-row v-if="itemStore.showFormCreate" class="px-5 my-5" align="center">
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.addDataVariant.code"
          label="Code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="itemStore.addDataVariant.description"
          label="Description"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-form
    @submit.prevent="
      itemStore.updateVariant(
        itemStore.editDataVariant.id,
        itemStore.editDataVariant.item_id
      )
    "
  >
    <v-row
      v-if="itemStore.showFormEditVariant"
      class="px-5 my-5"
      align="center"
    >
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.editDataVariant.code"
          label="Code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="itemStore.editDataVariant.description"
          label="Description"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
        <v-btn
          @click="itemStore.showFormEditVariant = false"
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
        <th class="text-left">Code</th>
        <th class="text-left">Description</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(vrt, i) in itemStore.detailData.item_variants" :key="vrt.id">
        <td>{{ i + 1 }}</td>
        <td>{{ vrt.code }}</td>
        <td>{{ vrt.description }}</td>
        <td>
          <v-btn
            @click="itemStore.openFormEditVariant(vrt)"
            class="me-2"
            prepend-icon="mdi:mdi-pen"
            color="yellow-darken-4"
            >Edit
          </v-btn>
          <v-btn
            @click="itemStore.deleteVariant(vrt.id, vrt.item_id)"
            class="me-2"
            prepend-icon="mdi:mdi-delete"
            color="red-darken-4"
            >Hapus
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { useItemStore } from "../../store/item-store";

export default {
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
  async mounted() {
    await this.itemStore.getDetailData(this.$route.params.id);
  },
};
</script>
