import { Tree } from '@nrwl/devkit';
import * as fs from 'fs';
import * as semver from 'semver';
import * as util from 'util';
import { Project } from 'ts-morph';
import changes from '../../changes-registry';

const readFile = util.promisify(fs.readFile);

export default async function (tree: Tree, schema: any) {
  const packageJson: any = JSON.parse(
    (await readFile('package.json')).toString()
  );
  if (!packageJson.dependencies[schema.package]) {
    throw Error(`Dependency "${schema.package}" is not found in package.json`);
  }
  const existingVersion = packageJson.dependencies[schema.package].replace(
    /^[\D]{1}/,
    ''
  );
  if (!changes[schema.package]) {
    console.log(`Changes for "${schema.package}" are missing`);
    return;
  }
  const activities: Function[] = [];
  for (const currentVersion of Object.keys(changes[schema.package])) {
    if (semver.gt(existingVersion, currentVersion)) {
      activities.push(changes[schema.package][currentVersion]);
    }
  }
  const project = new Project();
  const sources = [
    'libs/**/*.ts',
    'libs/**/*.tsx',
    'apps/client/**/*.ts',
    'apps/client/**/*.tsx',
  ];
  for (const activity of activities) {
    activity(project, sources);
  }
  await project.save();
}
