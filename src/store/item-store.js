import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useItemStore = defineStore("itemStore", {
  state: () => {
    return {
      showFormCreate: false,
      showFormEdit: false,
      showFormEditVariant: false,
      keyword: "",
      brand: "",
      category: "",
      order: "",
      page: 1,
      brandFilter: [],
      categoryFilter: [],
      orderFilter: [
        { value: "asc", title: "ASC" },
        { value: "desc", title: "DESC" },
      ],
      totalPage: 0,
      data: [],
      detailData: {
        id: null,
        brand: {},
        category: {},
        variants: [],
      },
      addData: {
        name: "",
        number: "",
        brand_id: "",
        category_id: "",
      },
      addDataVariant: {
        code: "",
        description: "",
        item_id: "",
      },
      editData: {
        name: "",
        number: "",
        brand_id: "",
        category_id: "",
      },
      editDataVariant: {
        code: "",
        description: "",
        item_id: "",
      },
    };
  },
  actions: {
    async resetForm() {
      this.addData.name = "";
      this.showFormCreate = false;
    },
    async resetFormVariant() {
      this.addData.code = "";
      this.addData.descrption = "";
      this.showFormCreate = false;
    },
    async getFilter() {
      try {
        const brand = await axios.get(
          "https://mart-api.kildev.my.id/api/brand"
        );
        this.brandFilter = brand.data.data;
        const category = await axios.get(
          "https://mart-api.kildev.my.id/api/category"
        );
        this.categoryFilter = category.data.data;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async getData() {
      try {
        const result = await axios.get(
          "https://mart-api.kildev.my.id/api/item",
          {
            params: {
              cari: this.keyword,
              brand: this.brand,
              category: this.category,
              order: this.order,
              page: this.page,
              limit: 1,
            },
          }
        );
        this.getFilter();
        this.data = result.data.data;
        this.totalPage = result.data.data.links.length - 2;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async getDetailData(id) {
      try {
        const result = await axios.get(
          "https://mart-api.kildev.my.id/api/item/" + id
        );
        this.detailData = result.data.data;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async addItem() {
      try {
        const result = await axios.post(
          "https://mart-api.kildev.my.id/api/item",
          this.addData
        );
        this.resetForm();
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async addVariant() {
      try {
        this.addDataVariant.item_id = this.detailData.id;
        const result = await axios.post(
          "https://mart-api.kildev.my.id/api/item-variant",
          this.addDataVariant
        );
        this.resetFormVariant();
        this.getDetailData(this.addDataVariant.item_id);
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async deleteItem(id) {
      try {
        const result = await axios.delete(
          "https://mart-api.kildev.my.id/api/item/" + id
        );
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async openFormEdit(id) {
      try {
        const result = await axios.get(
          "https://mart-api.kildev.my.id/api/item/" + id
        );
        this.editData.id = result.data.data.id;
        this.editData.name = result.data.data.name;
        this.editData.number = result.data.data.number;
        this.editData.brand_id = result.data.data.brand.id;
        this.editData.category_id = result.data.data.category.id;
        this.showFormEdit = true;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async updateBrand(id) {
      try {
        const result = await axios.put(
          "https://mart-api.kildev.my.id/api/item/" + id,
          this.editData
        );
        this.showFormEdit = false;
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteItem(id) {
      try {
        const result = await axios.delete(
          "https://mart-api.kildev.my.id/api/item/" + id
        );
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async addVariant() {
      try {
        this.addDataVariant.item_id = this.detailData.id;
        const result = await axios.post(
          "https://mart-api.kildev.my.id/api/item-variant",
          this.addDataVariant
        );
        this.resetFormVariant();
        this.getDetailData(this.addDataVariant.item_id);
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async deleteVariant(id, itmId) {
      try {
        const result = await axios.delete(
          "https://mart-api.kildev.my.id/api/item-variant/" + id
        );
        this.getDetailData(itmId);
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async openFormEditVariant(itm) {
      this.editDataVariant.id = itm.id;
      this.editDataVariant.code = itm.code;
      this.editDataVariant.description = itm.description;
      this.editDataVariant.item_id = itm.item_id;
      this.showFormEditVariant = true;
    },
    async updateVariant(id, itmId) {
      try {
        const result = await axios.put(
          "https://mart-api.kildev.my.id/api/item-variant/" + id,
          this.editDataVariant
        );
        this.showFormEditVariant = false;
        this.getDetailData(itmId);
        toast.success(result.data.message);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
