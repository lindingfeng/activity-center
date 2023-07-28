import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/hsbActivity/',
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: () => import('@/views/index/index.vue'),
      meta: {
        title: '回收宝'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/test/index.vue'),
      meta: {
        title: '回收宝'
      }
    }
  ]
});

export default router;
