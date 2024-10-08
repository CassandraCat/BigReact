import {
	resolvePackagePath,
	getPackageJson,
	getBaseRollupPlugins
} from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, main } = getPackageJson('react');

const packagePath = resolvePackagePath(name);

const packageDistPath = resolvePackagePath(name, true);

export default [
	// react
	{
		input: `${packagePath}/${main}`,
		output: {
			file: `${packageDistPath}/index.js`,
			name: 'React',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: packagePath,
				outputFolder: packageDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx-runtime
	{
		input: `${packagePath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${packageDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime',
				formate: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${packageDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime',
				formate: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
