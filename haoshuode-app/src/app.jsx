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
import { FontSelector } from './components/FontSelector.jsx';
import { sections, buildToc } from './lib/content-registry.js';
import { useProgress } from './lib/use-progress.js';

const toc = buildToc(sections);

export function App() {
  const { completed, observe } = useProgress();

  const introSections = sections.filter(s => s.meta.type === 'intro');
  const lessonSections = sections.filter(s => s.meta.type === 'lesson');
  const otherSections = sections.filter(s => !['intro', 'lesson'].includes(s.meta.type));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Sidebar sections={toc} completed={completed} />

      <main style={{ flex: 1, minWidth: 0, maxWidth: 'var(--content-max)', margin: '0 auto', padding: '64px 48px 120px' }}>
        <HeroSection />

        {introSections.map(s => (
          <Section key={s.meta.id} data={s} sectionRef={observe}>
            <div
              class="prose-body"
              style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--text-body)' }}
              dangerouslySetInnerHTML={{ __html: s.bodyHtml }}
            />
            {s.examples.length > 0 && <ExampleList items={s.examples} />}
          </Section>
        ))}

        <div style={{ height: 2, background: 'repeating-linear-gradient(90deg, var(--border-sidebar) 0 10px, transparent 10px 20px)', marginBottom: 64 }} />

        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Part 1</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, margin: '0 0 56px' }}>Lessons</h2>

        {lessonSections.map(s => (
          <Section key={s.meta.id} data={s} sectionRef={observe}>
            <VocabGrid items={s.vocab} />
            <GrammarBlock html={s.bodyHtml} />
            {s.story.length > 0 && <StoryBlock items={s.story} />}
            <ExampleList items={s.examples} />
            <PracticeExercise questions={s.exercise} answers={s.answers} />
          </Section>
        ))}

        {otherSections.length > 0 && (
          <>
            <div style={{ height: 2, background: 'repeating-linear-gradient(90deg, var(--border-sidebar) 0 10px, transparent 10px 20px)', marginBottom: 64 }} />

            {otherSections.map(s => (
              <Section key={s.meta.id} data={s} sectionRef={observe}>
                {s.meta.type === 'proverbs' && <ProverbList items={s.examples} />}
                {s.meta.type === 'dictionary' && <DictionarySection items={s.dict} />}
                {s.bodyHtml && s.meta.type !== 'proverbs' && s.meta.type !== 'dictionary' && (
                  <div
                    class="prose-body"
                    style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--text-body)' }}
                    dangerouslySetInnerHTML={{ __html: s.bodyHtml }}
                  />
                )}
              </Section>
            ))}
          </>
        )}

        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <FontSelector />
        </div>
      </main>
    </div>
  );
}
