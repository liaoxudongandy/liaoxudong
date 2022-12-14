import Index from './components/Index'
import bookshelf from './components/Bookshelf'
import Admin from './components/Admin'
import Myborrow from './components/Myborrow'

const routes = [
  {
    path: "/index",
    component: Index,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/bookshelf",
    component: bookshelf,
    meta: {
      title: "书架",
    },
  },
  {
    path: "/borrow",
    component: Myborrow,
    meta: {
      title: "我的借阅",
    },
  },
  {
    path: "/admin",
    component: Admin,
    meta: {
      title: "管理员",
    },
  },
];
export default routes;
