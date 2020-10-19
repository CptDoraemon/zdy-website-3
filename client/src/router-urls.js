const routes = {
  landingPage: '/',
  home: '/home',
  search: '/search',
  browse: '/browse',
  download: '/download',
  submission: '/submission',
  contact: '/contact',
  help: '/help',
  login: '/login',
  logout: '/logout',
  adminRegister: '/admin/register',
  adminLogin: '/admin/login',
  adminHome: '/admin/home',
  fallback: '/*'
};

// type TabLinks = {
//   title: string,
//   link: string
// }[];
const _navTabsDataForHeader = ['home', 'search', 'browse', 'submission', 'contact'];
export const navTabsDataForHeader = (() => {
  return _navTabsDataForHeader.map(key => ({
    title: key,
    link: routes[key]
  }))
})();

const routerUrls = {
  ...routes,
  searchRowDetail: {
    getRoute: (id) => `/search/detail/${id}`,
    route: `/search/detail/:id`
  }
};

export default routerUrls
