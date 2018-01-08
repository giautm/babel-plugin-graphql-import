# Babel GraphQL Import
Babel plugin to add the opportunity to use `import` for importing `*.graphql` files into your code with `graphql-import`.

## Examples

Before (without Babel-GraphQL-Import):
```javascript
// server.js

// bad syntax highlighting, no syntax checking
const typeDefinitions = `
type Query {
  testString: String
}
schema {
  query: Query
}
`;

graphQLServer({
  schema: [typeDefinitions],
  ...
});
```

Now (with Babel-GraphQL-Import):
```javascript
// /some/schema.graphql
type Query {
  testString: String
}
schema {
  query: Query
}
```

```javascript
// server.js
import schema from '/some/schema.graphql';

graphQLServer({
  schema: [schema],
  ...
});
```

**Note:** both cases are equivalent and will result in similar code after Babel transpile them. Check [How it works](#how-it-works) section for details.

## Install
```
npm install babel-plugin-graphql-import --save-dev
```

## Use
Add a `.babelrc` file and write:
```javascript
{
  "plugins": [
    "babel-plugin-graphql-import"
  ]
}
```
or pass the plugin with the plugins-flag on CLI
```
babel-node myfile.js --plugins babel-plugin-graphql-import
```

## How it works

It inserts the __content__ of the _imported file_ by using `importSchema` from _graphq-import_ into the _importing file_, assigning it to a variable with the same identifier of the _import statement_, thus replacing the _import statement_ and the _file path_ by its resulting content from `importSchema`.

## Caveats

Babel does not track dependency between _imported_ and _importing_ files after the transformation is made. Therefore, you need to change the _importing file_ in order to see your changes in the _imported file_ spread. To overcome this:

* If you are using `babel-node` or `babel-register`, you can [disable babel cache (`BABEL_DISABLE_CACHE=1`)](https://babeljs.io/docs/usage/babel-register/#environment-variables-babel-disable-cache).
* If you are using webpack with `babel-loader`, you can use [babel-inline-import-loader](https://github.com/elliottsj/babel-inline-import-loader).
