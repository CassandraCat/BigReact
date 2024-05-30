import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const packagePath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePackagePath(packageName: string, isDist = false) {
	if (isDist) return `${distPath}/${packageName}`;
	return `${packagePath}/${packageName}`;
}

export function getPackageJson(packageName: string) {
	const packageJsonPath = resolvePackagePath(packageName) + '/package.json';
	const str = fs.readFileSync(packageJsonPath, 'utf-8');
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
