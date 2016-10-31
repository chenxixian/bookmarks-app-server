export const ServerConfig = {
  development: {
    mongodb: 'mongodb://localhost/dev-bookmarksapp',
    secret: 'easyapisecret',
    port: 5868
  },
  production: {
    mongodb: 'mongodb://localhost/bookmarksapp',
    secret: 'C0mpl3xAPI $3cr3T',
    port: process.env.PORT || 8080
  }
};
