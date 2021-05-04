module.exports = {
  apps: [{
    name: 'nest-server',
    script: 'dist/main.js',
    watch: false,
    restart_delay: 5000,
    error_file: './logs/error.log',
    out_file: './logs/out.log'
  }]
};
