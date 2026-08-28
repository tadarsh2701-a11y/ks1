const fs = require('fs');
let code = fs.readFileSync('src/components/TopicDetail.tsx', 'utf8');

code = "'use client';\n" + code;
code = code.replace("import { Link } from 'react-router-dom';", "import Link from 'next/link';");
code = code.replace(/import { SEOHead } from '\.\/SEOHead';/, '');
code = code.replace(/import {\s*generateTopicArticleSchema,\s*generateTopicFaqSchema,\s*generateBreadcrumbSchema\s*} from '\.\.\/utils\/seo';/, '');

code = code.replace(/interface TopicDetailProps {[\s\S]*?}/, `interface TopicDetailProps {
  topic: TopicItem;
  onBack?: () => void;
  onSelectTopic?: (topic: TopicItem) => void;
  isBookmarked?: boolean;
  isPracticed?: boolean;
  isRead?: boolean;
  onToggleBookmark?: (topicId: number) => void;
  onTogglePracticed?: (topicId: number) => void;
  onMarkRead?: (topicId: number) => void;
  userNote?: string;
  onSaveNote?: (topicId: number, note: string) => void;
  onTriggerDiscretion?: () => void;
}`);

code = code.replace(/export function TopicDetail\({[\s\S]*?}: TopicDetailProps\) {/, `export function TopicDetail({
  topic,
  onBack,
  onSelectTopic,
  isBookmarked = false,
  isPracticed = false,
  isRead = false,
  onToggleBookmark,
  onTogglePracticed,
  onMarkRead,
  userNote = '',
  onSaveNote,
  onTriggerDiscretion
}: TopicDetailProps) {`);

code = code.replace(/onMarkRead\(topic\.id\);/g, 'if (onMarkRead) onMarkRead(topic.id);');
code = code.replace(/onToggleBookmark\(topic\.id\)/g, 'if (onToggleBookmark) onToggleBookmark(topic.id)');
code = code.replace(/onTogglePracticed\(topic\.id\)/g, 'if (onTogglePracticed) onTogglePracticed(topic.id)');
code = code.replace(/onSaveNote\(topic\.id, noteText\);/g, 'if (onSaveNote) onSaveNote(topic.id, noteText);');
code = code.replace(/onClick={onTriggerDiscretion}/g, 'onClick={() => { if (onTriggerDiscretion) onTriggerDiscretion(); }}');

code = code.replace(/<SEOHead[\s\S]*?\/>/, '');
code = code.replace(/<Link\s+to=/g, '<Link href=');

fs.writeFileSync('src/components/TopicDetail.tsx', code, 'utf8');
console.log('Successfully updated TopicDetail.tsx');