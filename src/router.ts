import { createRouter, createWebHistory, Router } from "vue-router";
import homePage from "./pages/index.vue";
import blogPage from "./pages/blogPost.vue";

const router = (): Router => {
  const Home = {
    path: "/",
    name: "home",
    component: homePage,
  };

  const BlogPost = {
    path: "/post/:id",
    name: "blog-post",
    component: blogPage,
  };

  const routes = [Home, BlogPost];

  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 };
    },
  });

  return router;
};

export default router();
