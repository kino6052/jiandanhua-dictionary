import matter from 'gray-matter';
import { marked } from 'marked';

const FENCE_TYPES = 'vocab|examples|exercise|answers|story|dict';
const HEADING_RE = /^##\s+(.+)$/gm;

function parseVocab(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const item = { pinyin: parts[0] || '', definition: parts[1] || '' };
    if (parts[2]) item.audioFile = parts[2];
    if (parts[3]) item.ttsText = parts[3];
    return item;
  });
}

function parseExamples(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const item = { pinyin: parts[0] || '', translation: parts[1] || '' };
    if (parts[2]) item.audioFile = parts[2];
    if (parts[3]) item.ttsText = parts[3];
    return item;
  });
}

function parseList(raw) {
  return raw.trim().split('\n').filter(Boolean).map(s => s.trim());
}

function parseAnswers(raw) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const item = { text: parts[0] || '' };
    if (parts[1]) item.audioFile = parts[1];
    if (parts[2]) item.ttsText = parts[2];
    return item;
  });
}

function parseDict(raw, category) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const item = { term: parts[0] || '', pos: parts[1] || '', definition: parts[2] || '', maps: parts[3] || '' };
    if (parts[4]) item.audioFile = parts[4];
    if (parts[5]) item.ttsText = parts[5];
    if (category) item.category = category;
    return item;
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
      const fenceRe = new RegExp('```(' + FENCE_TYPES + ')\\n([\\s\\S]*?)```', 'g');
      const proseParts = [];
      let currentCategory = null;
      let lastIndex = 0;
      let match;
      while ((match = fenceRe.exec(content)) !== null) {
        const [full, type, body] = match;
        const between = content.slice(lastIndex, match.index);
        const headingMatches = [...between.matchAll(HEADING_RE)];
        if (headingMatches.length > 0) {
          currentCategory = headingMatches[headingMatches.length - 1][1].trim();
        }
        proseParts.push(between);
        lastIndex = match.index + full.length;

        switch (type) {
          case 'vocab': structured.vocab = structured.vocab.concat(parseVocab(body)); break;
          case 'examples': structured.examples = structured.examples.concat(parseExamples(body)); break;
          case 'exercise': structured.exercise = structured.exercise.concat(parseList(body)); break;
          case 'answers': structured.answers = structured.answers.concat(parseAnswers(body)); break;
          case 'story': structured.story = structured.story.concat(parseExamples(body)); break;
          case 'dict': structured.dict = structured.dict.concat(parseDict(body, currentCategory)); break;
        }
      }
      proseParts.push(content.slice(lastIndex));
      const prose = proseParts.join('');

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
