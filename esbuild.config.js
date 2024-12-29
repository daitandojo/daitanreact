import { build } from 'esbuild';
import { glob } from 'glob';

async function buildProject() {
    try {
        const entryPoints = await glob('./src/**/index.js'); // Glob pattern to find entry points

        const buildOptions = {
            entryPoints,
            outdir: './dist', // Output directory for the built files
            bundle: true, // Bundle dependencies
            format: 'esm', // Output format (ES Modules)
            platform: 'node', // Target Node.js environment
            target: ['node16'], // Specify Node.js 16+ features
            sourcemap: true, // Generate source maps for debugging
            minify: false, // Disable minification (enable if needed)
            external: [
                'react', 
                'react-dom', 
                'events', 
                'fs', 
                'stream', 
                'url', 
                'util', 
                'http2', 
                'zlib', 
                'process',
            ], // Exclude Node.js core and React-related modules
            loader: {
                '.jsx': 'jsx', // Handle JSX files
                '.js': 'jsx', // Handle JS files
            },
        };

        await build(buildOptions);
        console.log('✅ Build completed!');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

buildProject();
