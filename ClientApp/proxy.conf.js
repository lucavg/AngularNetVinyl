const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:35744";

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/swagger",
      "/api/v1/authenticate",
      "/api/v1/spotify",
      "/api/v1/albums",
      "/api/v1/collections",
    ],
    target: target,
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
