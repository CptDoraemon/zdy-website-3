const routes = {
  home: '/',
  landingPage: '/',
  search: '/search',
  contact: '/contact',
  help: '/help',
  login: '/login',
  logout: '/logout',
  generateReport: '/generate-report',
  adminRegister: '/admin/register',
  adminLogin: '/admin/login',
  adminHome: '/admin/home',
  fallback: '/*'
};

const navBarDisplayNames = ['药物筛选', '成员介绍'];
const navBarKeys = ['search', 'contact'];
export const navTabsDataForHeader = (() => {
  return navBarDisplayNames.map((displayName, i) => ({
    title: displayName,
    link: routes[navBarKeys[i]]
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
