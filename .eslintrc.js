module.exports = {
    "env": {
        "browser": true,
        "es2015": true,
        "jest/globals": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double", {"allowTemplateLiterals": true}],
        
    },
    "settings": {
        "react": {
          "version": "detect",
        },
      }
};
