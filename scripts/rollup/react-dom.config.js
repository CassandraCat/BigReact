import {
	resolvePackagePath,
	getPackageJson,
	getBaseRollupPlugins
} from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';

const { name, main } = getPackageJson('react-dom');

const packagePath = resolvePackagePath(name);

const packageDistPath = resolvePackagePath(name, true);

export default [
	// react-dom
	{
		input: `${packagePath}/${main}`,
		output: [
			{
				file: `${packageDistPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			},
			{
				file: `${packageDistPath}/client.js`,
				name: 'client.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			// webpack resolve alias
			alias({
				entries: {
					hostConfig: `${packagePath}/src/hostConfig.ts`
				}
			}),
			generatePackageJson({
				inputFolder: packagePath,
				outputFolder: packageDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
];
