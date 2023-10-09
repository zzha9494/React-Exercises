module.exports = function override(config, env) {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ];

  return config;
};
