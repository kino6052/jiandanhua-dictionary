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
import { useAppRouter } from './lib/use-router.js';
import { useTheme } from './lib/use-theme.js';

function renderContent(s, lang) {
  const type = s.meta.type;
  if (type === 'intro') {
    return (
      <>
        <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />
        {s.examples.length > 0 && <ExampleList items={s.examples} />}
      </>
    );
  }
  if (type === 'proverbs') {
    return (
      <>
        {s.bodyHtml && <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />}
        <ProverbList items={s.examples} />
      </>
    );
  }
  if (type === 'dictionary') {
    return <DictionarySection items={s.dict} />;
  }
  if (type === 'appendix') {
    return <div class="prose-body" dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />;
  }
  return (
    <>
      <VocabGrid items={s.vocab} />
      <GrammarBlock html={s.bodyHtml} lang={lang} />
      {s.story.length > 0 && <StoryBlock items={s.story} />}
      <ExampleList items={s.examples} />
      <PracticeExercise questions={s.exercise} answers={s.answers} lang={lang} />
    </>
  );
}

export function App() {
  const router = useAppRouter();
  const { theme, toggle: toggleTheme } = useTheme();
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [router.pageIndex]);

  function handleSidebarNav(id) {
    const idx = router.sectionIds.indexOf(id);
    if (idx >= 0) router.goTo(idx);
  }

  const current = router.sections[router.pageIndex];
  if (!current) return null;

  const showHero = router.pageIndex === 0;

  return (
    <div class="app-shell">
      <Sidebar
        sections={router.toc}
        completed={router.completed}
        currentId={current.meta.id}
        onNavigate={handleSidebarNav}
        lang={router.lang}
        availableLangs={router.availableLangs}
        onSwitchLang={router.switchLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetProgress={router.resetProgress}
      />

      <main class="main-content" ref={mainRef}>
        <div class="page-inner">
          {showHero && <HeroSection lang={router.lang} />}

          <Section data={current}>
            {renderContent(current, router.lang)}
          </Section>

          <PageNav
            page={router.pageIndex}
            total={router.total}
            prev={router.prev}
            next={router.next}
            lang={router.lang}
          />
        </div>
      </main>
    </div>
  );
}
