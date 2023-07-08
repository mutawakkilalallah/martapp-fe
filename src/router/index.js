import { createRouter, createWebHistory } from "vue-router";

// component
import LayoutMain from "../pages/Layout/MainLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import BrandIndex from "../pages/brand/IndexPage.vue";
import CategoryIndex from "../pages/category/IndexPage.vue";
import ItemIndex from "../pages/item/IndexPage.vue";
import ItemDetail from "../pages/item/DetailPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: LayoutMain,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/brand",
        name: "brand-index",
        component: BrandIndex,
      },
      {
        path: "/category",
        name: "category-index",
        component: CategoryIndex,
      },
      {
        path: "/item",
        name: "item-index",
        component: ItemIndex,
      },
      {
        path: "/item/detail/:id",
        name: "item-detail",
        component: ItemDetail,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
