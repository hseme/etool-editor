import { Page } from '@/enums/page';
import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useGuards } from './guards';

const moduleRoutes = () => {
  const modules = import.meta.globEager('./modules/**/*.ts');
  const routeModules: RouteRecordRaw[] = [];

  Object.keys(modules).forEach((key) => {
    const routes = modules[key].default || {};
    const list = Array.isArray(routes) ? [...routes] : [routes];

    routeModules.push(...list);
  });

  return routeModules;
};

const baseRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: Page.DASH_NORMAL
};

export const asyncRoutes = [...moduleRoutes()];

export const constantRoutes = [
  baseRoute,
  ...asyncRoutes
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export const setupRouter = (app: App) => {
  app.use(router);

  useGuards(router);
};
