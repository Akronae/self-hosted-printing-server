import { execSync } from 'child_process';
import { readdirSync, writeFileSync } from 'fs';

const schematic = process.argv[2];
const name = process.argv[3];

if (!schematic || !name) {
  console.error('Usage: yarn gen:nest <(service | endpoint)> <name>');
  process.exit(1);
}

execSync(
  [
    `nest g module modules/${name}`,
    `nest g service modules/${name}`,
    schematic == 'endpoint' && `nest g controller modules/${name}`,
  ]
    .filter(Boolean)
    .join('&&'),
  { stdio: 'inherit' },
);

const files = readdirSync(`src/modules/${name}`).filter(
  (file) =>
    file.endsWith('.ts') && !file.includes('.spec') && !file.includes('.test'),
);
writeFileSync(
  `src/modules/${name}/index.ts`,
  files
    .map((file) => `export * from './${file.replace('.ts', '')}';`)
    .join('\n'),
);
