import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import singleSpaVue from "single-spa-vue";
Vue.config.productionTip = false;
Vue.use(ElementUI);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    store,
    el: "#rts",
    render: (h: any) => h(App)
  }
});

export const bootstrap = (props: any) => {
  console.log("vue-app is bootstrap");
  return vueLifecycles.bootstrap(props);
};

export const mount = (props: any) => {
  appMountDOMGetter("rts");
  console.log("vue-app is Mounted");
  return vueLifecycles.mount(props);
};
export const unmount = (props: any) => {
  console.log("vue-app is unMounted");
  return vueLifecycles.unmount(props);
};

function appMountDOMGetter(id: string): HTMLElement {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}
