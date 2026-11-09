import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const require=createRequire(import.meta.url);
// Use Vite's already-installed bundler, without adding a testing dependency.
const viteDirectory=path.dirname(require.resolve('vite/package.json'));
const esbuild=await import(pathToFileURL(require.resolve('esbuild',{paths:[viteDirectory]})));
const output=path.resolve('.sites-runtime/domain-tests.mjs');
await esbuild.build({entryPoints:['tests/ordering.test.ts'],bundle:true,packages:'external',platform:'node',format:'esm',outfile:output});
await import(pathToFileURL(output));
