const urls = {
  contributeToDatabase: '/api/contribute-to-database',
  tableData: '/api/table-data',
  tableColumns: '/api/table-data/columns',
  tableColumnOptions: '/api/table-data/column-options',
  registerAdmin: '/api/auth/admin/register',
  login: '/api/auth/login',
  verifyLogin: '/api/auth/ping',
  logout: '/api/auth/logout',
  adminLogin: '/api/auth/admin/login',
  adminGetAllUsers: '/api/admin/all-users',
  adminDeleteUser: '/api/admin/delete-user',
  adminCreateUser: '/api/admin/create-user'
};

if (process.env.REACT_APP_DEBUG === 'true') {
  Object.entries(urls).forEach(([key, value]) => {
    urls[key] = `http://localhost:5000${value}`
  })
}

export default urls
