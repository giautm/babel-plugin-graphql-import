import path from 'path';
import requireResolve from 'require-resolve';
import { importSchema } from 'graphql-import';

export default class BabelGraphQLImportHelper {
  static root = global.rootPath || process.cwd();

  static shouldBeInlined(givenPath) {
    return givenPath.endsWith('.graphql');
  }

  static getContents(givenPath, reference) {
    if (!reference) {
      throw new Error('"reference" argument must be specified');
    }

    const mod = requireResolve(givenPath, path.resolve(reference));

    if (!mod || !mod.src) {
      throw new Error(`Path '${givenPath}' could not be found for '${reference}'`);
    }

    return importSchema(mod.src);
  }

  static transformRelativeToRootPath(path, rootPathSuffix) {
    if (this.hasRoot(path)) {
      const withoutRoot = path.substring(1, path.length);
      return `${BabelGraphQLImportHelper.root}${rootPathSuffix || ''}/${withoutRoot}`;
    }
    if (typeof path === 'string') {
      return path;
    }
    throw new Error('ERROR: No path passed');
  }

  static hasRoot(string) {
    if (typeof string !== 'string') {
      return false;
    }

    return string.substring(0, 1) === '/';
  }
}
