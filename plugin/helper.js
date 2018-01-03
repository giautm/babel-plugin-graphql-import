import path from 'path';
import requireResolve from 'require-resolve';
import { importSchema } from 'graphql-import';

export default class BabelGraphQLImportHelper {
  static extensions = [
    '.graphql',
    '.gql',
  ];

  static shouldBeInlined(givenPath, extensions) {
    const accept = (typeof extensions === 'string')
      ? [extensions]
      : (extensions || BabelGraphQLImportHelper.extensions);

    for (const extension of accept) {
      if (givenPath.endsWith(extension)) {
        return true;
      }
    }

    return false;
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
}
