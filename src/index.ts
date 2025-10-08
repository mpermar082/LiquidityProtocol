// src/index.ts
/**
 * Main entry point for LiquidityProtocol
 */

import { LiquidityProtocol } from './liquidityprotocol';
import minimist from 'minimist';

interface Args {
    /**
     * Enable verbose logging
     */
    verbose?: boolean;
    /**
     * Input file path
     */
    input?: string;
    /**
     * Output file path (optional)
     */
    output?: string;
}

const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main execution function
 */
async function main(): Promise<void> {
    try {
        // Initialize LiquidityProtocol instance
        const app = new LiquidityProtocol({
            verbose: args.verbose || false
        });

        // Log verbose messages if enabled
        if (args.verbose) {
            console.log('Starting LiquidityProtocol processing...');
        }

        // Execute the protocol
        const result = await app.execute();

        // Save results to file if output path is provided
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Entry point check
if (require.main === module) {
    main();
}