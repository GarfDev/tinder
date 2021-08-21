module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        // workspace packages
        "@tinder/back-end",
        "@tinder/front-end",
        "@tinder/shared-types",
        "eslint",
        "*",
      ],
    ],
  },
};
