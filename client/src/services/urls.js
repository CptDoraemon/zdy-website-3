const urls = {
  contributeToDatabase: '/api/contribute-to-database',
  tableData: '/api/table-data',
  tableColumns: '/api/table-data-columns',
  tableColumnOptions: '/api/table-data-column-options',
  registerAdmin: '/api/auth/admin/register',
  verifyLogin: '/api/auth/ping',
  adminLogin: '/api/auth/admin/login'
};

if (process.env.REACT_APP_DEBUG === 'true') {
  Object.entries(urls).forEach(([key, value]) => {
    urls[key] = `http://localhost:5000${value}`
  })
}

export default urls
