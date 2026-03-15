module.exports = {
  apps: [{
    name: 'rekor-torna',
    script: 'server.js',
    cwd: '/var/www/rekor-torna',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
