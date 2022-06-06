import './styles/tailwind.css';
import { createApp } from 'vue';
import App from './App';
import { setupRouter } from './router';
import { setupStore } from './stores';
import { setMeta } from './utils/naive-ui';

(async () => {
  const app = createApp(App);

  // pinia
  setupStore(app);

  // router
  setupRouter(app);

  // naive-ui
  setMeta();

  app.mount('#app', true);
})();
