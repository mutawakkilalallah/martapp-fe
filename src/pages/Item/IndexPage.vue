<template>
  <h1 class="px-5 pt-5">All Items</h1>
  <v-row no-gutters>
    <v-col cols="12" sm="2" class="px-5 pt-5">
      <v-select
        v-model="itemStore.brand"
        label="Brand"
        @update:modelValue="itemStore.getData"
        :items="itemStore.brandFilter"
        item-title="name"
        item-value="id"
        variant="underlined"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="2" class="px-5 pt-5">
      <v-select
        v-model="itemStore.category"
        label="Category"
        @update:modelValue="itemStore.getData"
        :items="itemStore.categoryFilter"
        item-title="name"
        item-value="id"
        variant="underlined"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="2" class="px-5 pt-5">
      <v-select
        v-model="itemStore.order"
        label="Order"
        @update:modelValue="itemStore.getData"
        :items="itemStore.orderFilter"
        item-title="title"
        item-value="value"
        variant="underlined"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6" class="px-5 pt-5">
      <v-text-field
        label="Search item .."
        v-model="itemStore.keyword"
        @keyup="itemStore.getData"
        required
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
  <v-form @submit.prevent="itemStore.addItem">
    <v-row v-if="itemStore.showFormCreate" class="px-5 my-5" align="center">
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.addData.name"
          label="Name Item"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.addData.number"
          label="Nomer Item"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" class="px-5 pt-5">
        <v-select
          v-model="itemStore.addData.brand_id"
          label="Brand"
          :items="itemStore.brandFilter"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2" class="px-5 pt-5">
        <v-select
          v-model="itemStore.addData.category_id"
          label="Category"
          :items="itemStore.categoryFilter"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-form @submit.prevent="itemStore.updateBrand(itemStore.editData.id)">
    <v-row v-if="itemStore.showFormEdit" class="px-5 my-5" align="center">
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.editData.name"
          label="Name Item"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="itemStore.editData.number"
          label="Nomer Item"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" class="px-5 pt-5">
        <v-select
          v-model="itemStore.editData.brand_id"
          label="Brand"
          :items="itemStore.brandFilter"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2" class="px-5 pt-5">
        <v-select
          v-model="itemStore.editData.category_id"
          label="Category"
          :items="itemStore.categoryFilter"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn type="submit" color="green-darken-4">Simpan</v-btn>
        <v-btn
          @click="itemStore.showFormEdit = false"
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
        <th class="text-left">Number</th>
        <th class="text-left">Brand</th>
        <th class="text-left">Category</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(itm, i) in itemStore.data.data" :key="itm.id">
        <td>{{ i + 1 }}</td>
        <td>{{ itm.name }}</td>
        <td>{{ itm.number }}</td>
        <td>{{ itm.brand.name }}</td>
        <td>{{ itm.category.name }}</td>
        <td>
          <router-link :to="{ name: 'item-detail', params: { id: itm.id } }">
            <v-btn class="me-2" prepend-icon="mdi:mdi-eye" color="cyan-darken-4"
              >Detail</v-btn
            >
          </router-link>
          <v-btn
            @click="itemStore.openFormEdit(itm.id)"
            class="me-2"
            prepend-icon="mdi:mdi-pen"
            color="yellow-darken-4"
            >Edit
          </v-btn>
          <v-btn
            @click="itemStore.deleteItem(itm.id)"
            class="me-2"
            prepend-icon="mdi:mdi-delete"
            color="red-darken-4"
            >Hapus
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    class="mt-10"
    v-model="itemStore.page"
    @update:modelValue="itemStore.getData"
    :length="itemStore.totalPage"
  ></v-pagination>
</template>

<script>
import { useItemStore } from "../../store/item-store";
export default {
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
  async mounted() {
    await this.itemStore.getData();
  },
};
</script>
