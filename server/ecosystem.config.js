module.exports = {
  apps: [{
    name: 'nest-server',
    script: 'dist/main.js',
    watch: false,
    restart_delay: 5000,
    error_file: '/var/log/pm2/error.log',
    out_file: '/var/log/pm2/out.log'
  }]
};
