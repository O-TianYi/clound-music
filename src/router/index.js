import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views"),
    children: [{
        path: "discovery",
        name: "discovery",
        component: () => import("../views/discovery"),
        children: [{
            path: "recommendation",
            name: "recommendation",
            component: () => import("../components/discovery/recommendation.vue"),
          },
          {
            path: "playlist",
            name: "playlist",
            component: () => import("../components/discovery/playlist.vue"),
          },
          {
            path: "station",
            name: "station",
            component: () => import("../components/discovery/station.vue"),
          },
          {
            path: "singers",
            name: "singers",
            component: () => import("../components/discovery/singers.vue"),
          },
          {
            path: "lastestmusic",
            name: "lastestmusic",
            component: () => import("../components/discovery/lastestmusic.vue"),
          },
          {
            path: "ranking",
            name: "ranking",
            component: () => import("../components/discovery/ranking.vue"),
          },
        ]
      },
      {
        path: "live",
        name: "live",
        component: () => import("../views/live"),
      },
      {
        path: "mv",
        name: "mv",
        component: () => import("../views/mv"),
      },
      {
        path: "mymusic",
        name: "mymusic",
        component: () => import("../views/mymusic"),
      },
      {
        path: "recommend",
        name: "recommend",
        component: () => import("../views/recommend"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("../views/user"),
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;