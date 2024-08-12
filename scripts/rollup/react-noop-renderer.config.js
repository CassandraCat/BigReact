import {
	getPackageJson,
	resolvePackagePath,
	getBaseRollupPlugins
} from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';

const { name, main, peerDependencies } = getPackageJson('react-noop-renderer');
const packagePath = resolvePackagePath(name);
const packageDistPath = resolvePackagePath(name, true);

export default [
	// react-noop-renderer
	{
		input: `${packagePath}/${main}`,
		output: [
			{
				file: `${packageDistPath}/index.js`,
				name: 'ReactNoopRenderer',
				format: 'umd'
			}
		],
		external: [...Object.keys(peerDependencies), 'scheduler'],
		plugins: [
			...getBaseRollupPlugins({
				typescript: {
					exclude: ['./packages/react-dom/**/*'],
					tsconfigOverride: {
						compilerOptions: {
							paths: {
								hostConfig: [`./${name}/src/hostConfig.ts`]
							}
						}
					}
				}
			}),
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
