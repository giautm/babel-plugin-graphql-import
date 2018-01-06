import BabelGraphQLImportHelper from './helper';

export default function({ types: t }) {
  class BabelGraphQLImport {
    constructor() {
      return {
        visitor: {
          ImportDeclaration: {
            exit(path, state) {
              const givenPath = path.node.source.value;
              let reference = state && state.file && state.file.opts.filename;

              if (BabelGraphQLImportHelper.shouldBeInlined(givenPath)) {
                if (path.node.specifiers.length > 1) {
                  throw new Error(`Destructuring inlined import is not allowed. Check the import statement for '${givenPath}'`);
                }

                // Here we detect the use of Meteor by checking global.meteorBabelHelpers
                if(global.meteorBabelHelpers && BabelGraphQLImportHelper.hasRoot(reference)) {
                  reference = BabelGraphQLImportHelper.transformRelativeToRootPath(reference);
                }

                const id = path.node.specifiers[0].local.name;
                const content = BabelGraphQLImportHelper.getContents(givenPath, reference);
                const variable = t.variableDeclarator(t.identifier(id), t.stringLiteral(content));

                path.replaceWith({
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [variable],
                  leadingComments: [
                    {
                      type: 'CommentBlock',
                      value: ` babel-plugin-graphql-import '${givenPath}' `
                    }
                  ]
                });
              }
            }
          }
        }
      };
    }
  }

  return new BabelGraphQLImport();
}
