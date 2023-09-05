import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://d15a9hujs3hnur.cloudfront.net/graphql',
	documents: '**/*.{tsx,ts}',
	generates: {
		'gql/': {
			preset: 'client',
			plugins: []
		},
		'./graphql.schema.json': {
			plugins: ['introspection']
		}
	}
};

export default config;
