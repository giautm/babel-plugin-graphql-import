import BabelGraphQLImportHelper from '../helper';

describe('Babel GraphQL Import - Helper', () => {

  describe('Class', () => {
    it('returns the default extensions', () => {
      expect(BabelGraphQLImportHelper.extensions).toEqual([
        '.graphql',
        '.gql',
      ]);
    });
  });

  describe('shouldBeInlined', () => {
      it('accepts a default extension', () => {
        const shouldIt = BabelGraphQLImportHelper.shouldBeInlined('example.gql');
        expect(shouldIt).toBe(true);
      });

      it('rejects a non default extension', () => {
        const shouldIt = BabelGraphQLImportHelper.shouldBeInlined('example.js');
        expect(shouldIt).toBe(false);
      });

      it('accepts a user defined extension', () => {
        const shouldIt = BabelGraphQLImportHelper.shouldBeInlined('example.python', ['.python']);
        expect(shouldIt).toBe(true);
      });

      it('rejects a non user defined extension', () => {
        const shouldIt = BabelGraphQLImportHelper.shouldBeInlined('example.raw', ['.python']);
        expect(shouldIt).toBe(false);
      });

      it('throws error if no array or string is passed as extensions', () => {
        expect(() => {
          BabelGraphQLImportHelper.shouldBeInlined('example.raw', true);
        }).toThrowError(Error);
      });
  });

  describe('getContents', () => {
    it('throws error if no reference is specified', () => {
      expect(() => {
        BabelGraphQLImportHelper.getContents('./fixtures/example.raw');
      }).toThrowError(Error);
    });

    it('throws error if file does not exist', () => {
      expect(() => {
        BabelGraphQLImportHelper.getContents('non_existent.raw', __filename);
      }).toThrowError(Error);
    });

    it('returns file content', () => {
      expect(BabelGraphQLImportHelper.getContents('./fixtures/example.graphql', __filename)).toMatchSnapshot();
    });
  });
});
