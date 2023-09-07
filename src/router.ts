import { createRouter as _createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob("../src/pages/**/*.vue");

// let homeRoute = {};
export const routes = Object.keys(pages).map((path) => {
  const arr = path.match(/\/pages(.*)\.vue$/) || ["home"];
  let name = arr[1].toLowerCase() || "";
  if (name.substring(name.length - 5) == "index") {
    name = name.slice(0, -5); //去掉最后的index
  }

  return {
    path: name === "/home/" ? "/" : name,
    component: pages[path],
  };
});

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    routes,
  });
}
