import BabelGraphQLImportPlugin from '../index';
import * as babel from 'babel-core';

describe('Babel GraphQL Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the import statement into a variable with the intended content', () => {
      const transformedCode = babel.transform("import SomeExample from './fixtures/example.graphql';", {
        filename: __filename,
        plugins: [BabelGraphQLImportPlugin]
      });

      expect(transformedCode.code).toMatchSnapshot();
    });

    it('throws error when importing with destructuring', () => {
      expect(() => {
        babel.transform("import { SomeExample, AnotherExample } from './fixtures/example.graphql';", {
          filename: __filename,
          plugins: [BabelGraphQLImportPlugin]
        });
      }).toThrow(Error);
    });
  });
});
