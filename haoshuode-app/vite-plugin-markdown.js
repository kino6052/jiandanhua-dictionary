import matter from 'gray-matter';
import { marked } from 'marked';

const FENCE_RE = /```(vocab|examples|exercise|answers|story|dict)\n([\s\S]*?)```/g;

function parseVocab(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    return { pinyin: parts[0] || '', definition: parts[1] || '' };
  });
}

function parseExamples(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    return { pinyin: parts[0] || '', translation: parts[1] || '' };
  });
}

function parseList(raw) {
  return raw.trim().split('\n').filter(Boolean).map(s => s.trim());
}

function parseDict(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    return { term: parts[0] || '', pos: parts[1] || '', definition: parts[2] || '', maps: parts[3] || '' };
  });
}

export default function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(src, id) {
      if (!id.endsWith('.md')) return null;

      const { data: meta, content: rawContent } = matter(src);
      const content = rawContent.replace(/\r\n/g, '\n');

      const structured = { vocab: [], examples: [], exercise: [], answers: [], story: [], dict: [] };
      const prose = content.replace(FENCE_RE, (_, type, body) => {
        switch (type) {
          case 'vocab': structured.vocab = parseVocab(body); break;
          case 'examples': structured.examples = parseExamples(body); break;
          case 'exercise': structured.exercise = parseList(body); break;
          case 'answers': structured.answers = parseList(body); break;
          case 'story': structured.story = parseExamples(body); break;
          case 'dict': structured.dict = parseDict(body); break;
        }
        return '';
      });

      const bodyHtml = marked.parse(prose.trim());

      const module = {
        meta,
        ...structured,
        bodyHtml,
      };

      return {
        code: `export default ${JSON.stringify(module)};`,
        map: null,
      };
    },
  };
}
