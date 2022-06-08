import { markRaw } from 'vue';

export const createDirective = raw => markRaw(raw);
