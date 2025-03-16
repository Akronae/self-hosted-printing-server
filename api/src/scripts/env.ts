import { loadEnv } from '@/src/utils/env/load-env';
import { execSync } from 'child_process';

loadEnv();
const joined = process.argv.join(' ');
const cmd = joined.substring(joined.indexOf('env.ts') + 'env.ts'.length + 1);
console.log({ cmd });
execSync(cmd, { stdio: 'inherit' });
