import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCategoryStore = defineStore("categoryStore", {
  state: () => {
    return {
      showFormCreate: false,
      showFormEdit: false,
      data: [],
      addData: {
        name: "",
      },
      editData: {
        name: "",
      },
    };
  },
  actions: {
    async resetForm() {
      this.addData.name = "";
      this.showFormCreate = false;
    },
    async getData() {
      try {
        const result = await axios.get("http://martapi-be.test/api/category");
        this.data = result.data.data;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async addCategory() {
      try {
        const result = await axios.post(
          "http://martapi-be.test/api/category",
          this.addData
        );
        this.resetForm();
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async openFormEdit(id) {
      try {
        const result = await axios.get(
          "http://martapi-be.test/api/category/" + id
        );
        this.editData.id = result.data.data.id;
        this.editData.name = result.data.data.name;
        this.showFormEdit = true;
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
    async updateCategory(id) {
      try {
        const result = await axios.put(
          "http://martapi-be.test/api/category/" + id,
          this.editData
        );
        this.showFormEdit = false;
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCategory(id) {
      try {
        const result = await axios.delete(
          "http://martapi-be.test/api/category/" + id
        );
        this.getData();
        toast.success(result.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
  },
});
