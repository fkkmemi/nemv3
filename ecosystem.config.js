let cfg = require('./cfg')
if (!cfg) cfg = { deploy: null }

module.exports = {
  apps : [{
    name: 'nemv',
    script: './be/bin/www',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_pr: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }],

  deploy : cfg.deploy
};

console.log(cfg)
