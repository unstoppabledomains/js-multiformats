import esbuild from 'esbuild';
import glob from 'glob';

// Get all .js files under the src directory
const files = glob.sync('./src/**/*.js');

// Process each file
files.forEach(file => {
    esbuild.build({
        entryPoints: [file],
        bundle: true,
        format: 'cjs',
        outfile: file.replace('src', 'dist/cjs').replace('.js', '.cjs'),
        platform: 'node',
        sourcemap: true,
    }).catch((reason) => {
        console.error(reason);
        process.exit(1)
    });
});
