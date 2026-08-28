const fs = require('fs');

// 1. Fix tsconfig.json without BOM
const tsconfig = {
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*", "./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "dist"]
};
fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2), 'utf8');

// 2. Fix TopicDetail.tsx
let code = fs.readFileSync('src/components/TopicDetail.tsx', 'utf8');
code = code.replace(/onClick=\{\(\) => if \(/g, 'onClick={() => { if (');
code = code.replace(/onToggleBookmark\(topic\.id\)\}/g, 'onToggleBookmark(topic.id); }}');
code = code.replace(/onTogglePracticed\(topic\.id\)\}/g, 'onTogglePracticed(topic.id); }}');
fs.writeFileSync('src/components/TopicDetail.tsx', code, 'utf8');

console.log('Fixed tsconfig.json and TopicDetail.tsx');