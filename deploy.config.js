module.exports = {
  // Application configuration section
  // http://pm2.keymetrics.io/docs/usage/application-declaration/

  apps: [
    // First application
    {
      name: 'metabridge',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  // Deployment section
  // http://pm2.keymetrics.io/docs/usage/deployment/

  deploy: {
    production: {
      user: 'sam',
      host: 'metabridge.org',
      ref: 'origin/master',
      repo: 'git@github.com:samhinshaw/metabridge_node.git',
      path: '/home/sam/node_apps/metabridge',
      ssh_options: 'ForwardAgent=yes',
      'post-deploy':
        'yarn install && yarn build && pm2 startOrRestart deploy.config.js --env production && yarn rollbar',
      env: {
        PATH:
          '/home/sam/.yarn/bin:/home/sam/.npm-global/bin:/home/sam/.nvm/versions/node/v8.10.0/bin:/home/sam/.npm-global/bin:/home/sam/.npm-global/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games'
      }
    }
    // dev: {
    //   user: 'node',
    //   host: '212.83.163.1',
    //   ref: 'origin/master',
    //   repo: 'git@github.com:repo.git',
    //   path: '/var/www/development',
    //   'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
    //   env: {
    //     NODE_ENV: 'dev'
    //   }
    // }
  }
};
