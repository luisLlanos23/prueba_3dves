module.exports = {
  "env": {
    "browser": false,
    "es6": true
  },
  "extends": "airbnb-base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "key-spacing": [
      "error", {
        "align": { "beforeColon": true, "afterColon": true, "on": "colon" }
      }
    ],
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "quotes": [ "error", "single", { "allowTemplateLiterals": true }],
  },
};
