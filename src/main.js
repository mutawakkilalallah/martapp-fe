import { createApp } from "vue";
import router from "./router/index";
// import "./style.css";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

app.use(Toast, options);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
