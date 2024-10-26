module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
        if (oneOfRule) {
          const tsxRule = oneOfRule.oneOf.find((rule) => rule.test && rule.test.toString().includes('tsx'));
          if (tsxRule) {
            tsxRule.include = undefined;
            tsxRule.exclude = /node_modules/;
          }
        }
        return webpackConfig;
      },
    },
  };