module.exports = {
  env: {
    browser: true, //이것은 main.js 파일에서 document 등을 사용할 수 있게끔 해준다.
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "spaced-comment": "off",
    "no-else-return": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
    indent: "off",
    "no-use-before-define": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
