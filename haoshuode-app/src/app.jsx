import { useRef, useEffect } from 'preact/hooks';
import { Sidebar } from './components/Sidebar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { Section } from './components/Section.jsx';
import { VocabGrid } from './components/VocabGrid.jsx';
import { GrammarBlock } from './components/GrammarBlock.jsx';
import { ExampleList } from './components/ExampleList.jsx';
import { PracticeExercise } from './components/PracticeExercise.jsx';
import { StoryBlock } from './components/StoryBlock.jsx';
import { DictionarySection } from './components/DictionarySection.jsx';
import { ProverbList } from './components/ProverbList.jsx';
import { PageNav } from './components/PageNav.jsx';
import { sections, buildToc } from './lib/content-registry.js';
import { useProgress } from './lib/use-progress.js';

const toc = buildToc(sections);
const sectionIds = sections.map(s => s.meta.id);

function renderContent(s) {
  const t = s.meta.type;
  if (t === 'intro') {
    return (
      <>
        <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />
        {s.examples.length > 0 && <ExampleList items={s.examples} />}
      </>
    );
  }
  if (t === 'proverbs') {
    return (
      <>
        {s.bodyHtml && <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />}
        <ProverbList items={s.examples} />
      </>
    );
  }
  if (t === 'dictionary') {
    return <DictionarySection items={s.dict} />;
  }
  if (t === 'appendix') {
    return <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />;
  }
  return (
    <>
      <VocabGrid items={s.vocab} />
      <GrammarBlock html={s.bodyHtml} />
      {s.story.length > 0 && <StoryBlock items={s.story} />}
      <ExampleList items={s.examples} />
      <PracticeExercise questions={s.exercise} answers={s.answers} />
    </>
  );
}

export function App() {
  const { completed, page, total, goTo, next, prev } = useProgress(sectionIds);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [page]);

  function handleSidebarNav(id) {
    const idx = sectionIds.indexOf(id);
    if (idx >= 0) goTo(idx);
  }

  const current = sections[page];
  if (!current) return null;

  const showHero = page === 0;

  return (
    <div class="app-shell">
      <Sidebar
        sections={toc}
        completed={completed}
        currentId={current.meta.id}
        onNavigate={handleSidebarNav}
      />

      <main class="main-content" ref={mainRef}>
        <div class="page-inner">
          {showHero && <HeroSection />}

          <Section data={current}>
            {renderContent(current)}
          </Section>

          <PageNav page={page} total={total} prev={prev} next={next} />
        </div>
      </main>
    </div>
  );
}
