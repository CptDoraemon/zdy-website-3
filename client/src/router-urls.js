const navTabs = {
  landingPage: '/',
  home: '/home',
  search: '/search',
  browse: '/browse',
  download: '/download',
  submission: '/submission',
  contact: '/contact',
  help: '/help',
  adminRegister: '/admin/register',
  adminLogin: '/admin/login',
  fallback: '/*'
};

export const navTabsDataForHeader = Object.keys(navTabs).map(key => ({
  title: key,
  link: navTabs[key]
}));

const routerUrls = {
  ...navTabs,
  searchRowDetail: {
    getRoute: (id) => `/search/detail/${id}`,
    route: `/search/detail/:id`
  }
};

export default routerUrls
