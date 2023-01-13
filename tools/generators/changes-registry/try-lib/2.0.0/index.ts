import { Project, SyntaxKind, Node } from 'ts-morph';

function walkAndChange(
  node: Node,
  nodeKinds: SyntaxKind[],
  oldName: string,
  newName: string
) {
  if (
    nodeKinds.includes(node.getKind()) &&
    node.getFullText().trim() === oldName
  ) {
    node.replaceWithText(newName);
    return;
  }
  node.forEachChild((c) => walkAndChange(c, nodeKinds, oldName, newName));
}

export default function (project: Project, sources: string[]) {
  project.addSourceFilesAtPaths(sources);
  const files = project.getSourceFiles();

  for (const file of files) {
    walkAndChange(
      file,
      [SyntaxKind.Identifier, SyntaxKind.ImportSpecifier],
      'deprecatedSum',
      'sum'
    );
  }
}
