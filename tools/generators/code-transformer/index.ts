import { Tree } from '@nrwl/devkit';
import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';
import * as util from 'util';
import { Project } from 'ts-morph';
import compile from './compiler';

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

  const updatesJson: any = JSON.parse(
    (await readFile('tools/updates/updates.json')).toString()
  );
  const activities: string[] = [];
  for (const record of updatesJson.updates) {
    if (schema.package === record.package && semver.gte(existingVersion, record.version)) {
      activities.push(path.resolve(process.cwd(), record.implementation));
    }
  }
  compile(activities, {});

  const project = new Project();
  const sources = [
    'libs/**/*.ts',
    'libs/**/*.tsx',
    'apps/client/**/*.ts',
    'apps/client/**/*.tsx',
  ];

  for (const activity of activities) {
    const fn = await require(activity).default;
    fn(project, sources);
  }
  await project.save();
}
