const fs = require('fs');

// 1. Remove old Vite entry files
if (fs.existsSync('src/main.tsx')) {
  fs.unlinkSync('src/main.tsx');
}
if (fs.existsSync('src/App.tsx')) {
  fs.unlinkSync('src/App.tsx');
}

// 2. Fix TopicDetail.tsx
let code = fs.readFileSync('src/components/TopicDetail.tsx', 'utf8');

// Replace all remaining <Link to= or to= in Link tags
code = code.replace(/<Link\s+to=/g, '<Link href=');
code = code.replace(/<Link\s+id="topic-back-btn"\s+to=/g, '<Link id="topic-back-btn" href=');

// Remove unused schema variables inside TopicDetail
code = code.replace(/const topicArticleSchema =[\s\S]*?const structuredDataList =[\s\S]*?;/, '');

// Replace any remaining to= inside <Link ... to=
code = code.replace(/<Link([^>]*?)\sto=/g, '<Link$1 href=');

fs.writeFileSync('src/components/TopicDetail.tsx', code, 'utf8');

console.log('Cleaned up TopicDetail.tsx and removed old Vite files');