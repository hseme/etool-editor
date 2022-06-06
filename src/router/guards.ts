import { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';

export const useGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    next();
  });

  router.afterEach((to) => {
    const {
      VITE_TITLE
    } = import.meta.env;
    const title = to?.meta?.title;
    useTitle(title ? `${title} - ${VITE_TITLE}` : VITE_TITLE);
  });
};
