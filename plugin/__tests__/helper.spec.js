import BabelGraphQLImportHelper from '../helper';

describe('Babel GraphQL Import - Helper', () => {

  describe('Class', () => {
    it('returns the default extensions', () => {
      expect(BabelGraphQLImportHelper.extensions).toEqual([
        '.graphql',
        '.gql',
      ]);
    });

    it('returns the root path', () => {
      const rootByProcess = process.cwd();
      expect(BabelGraphQLImportHelper.root).toBe(rootByProcess);
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
        }).toThrow(Error);
      });
  });

  describe('getContents', () => {
    it('throws error if no reference is specified', () => {
      expect(() => {
        BabelGraphQLImportHelper.getContents('./fixtures/example.raw');
      }).toThrow(Error);
    });

    it('throws error if file does not exist', () => {
      expect(() => {
        BabelGraphQLImportHelper.getContents('non_existent.raw', __filename);
      }).toThrow(Error);
    });

    it('returns file content', () => {
      expect(BabelGraphQLImportHelper.getContents('./fixtures/example.graphql', __filename)).toMatchSnapshot();
    });
  });

  describe('transformRelativeToRootPath', () => {
    it('returns a string', () => {
      const func = BabelGraphQLImportHelper.transformRelativeToRootPath('');
      expect(typeof func).toBe('string');
    });

    it('transforms given path relative root-path', () => {
      const rootPath = `${process.cwd()}/some/path`;
      const result = BabelGraphQLImportHelper.transformRelativeToRootPath('/some/path');
      expect(result).toEqual(rootPath);
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelGraphQLImportHelper.transformRelativeToRootPath();
      }).toThrow(Error);
    });
  });


  describe('hasRoot', () => {
    it('returns a boolean', () => {
      const func = BabelGraphQLImportHelper.hasRoot();
      expect(typeof func).toBe('boolean');
    });

    it('check if the string has "/" at the beginning', () => {
      const withRoot = BabelGraphQLImportHelper.hasRoot('/path');
      const withoutRoot = BabelGraphQLImportHelper.hasRoot('./some/path');
      expect(withoutRoot).toBe(false);
      expect(withRoot).toBe(true);
    });

    it('returns false if no string passed', () => {
      const nothingPassed = BabelGraphQLImportHelper.hasRoot();
      const wrongTypePassed = BabelGraphQLImportHelper.hasRoot([]);
      expect(nothingPassed).toBe(false);
      expect(wrongTypePassed).toBe(false);
    });
  });
});
