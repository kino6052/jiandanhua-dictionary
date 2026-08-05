import { useState } from "preact/hooks";
import dictionary from "../data/dictionary.json";
import { categoryWordCount } from "../lib/dictionary-stats.js";
import { AudioButton } from "./AudioButton.jsx";
import { getUsageLabels } from "../lib/word-usage.js";
import { t } from "../lib/i18n.js";
import styles from "./CategoricalDictionarySection.module.css";

function WordEntry({ id, lang }) {
  const word = dictionary.words[id];
  if (!word) return null;
  const usage = getUsageLabels(id);
  return (
    <div class={styles.entry}>
      <span class={styles.term}>
        {word.term}
        <AudioButton
          pinyin={word.term}
          audioFile={word.audioFile}
          ttsText={word.ttsText}
        />
      </span>
      {word.pos?.[lang] && <span class={styles.pos}>[{word.pos[lang]}]</span>}
      <span class={styles.def}> — {word.definition[lang]}</span>
      {word.maps && (
        <span class={styles.maps}>
          {" "}
          (Maps to: <i>{word.maps}</i>)
        </span>
      )}
      {usage.length > 0 ? (
        <div class={styles.usage}>
          {t(lang, "usedIn")} {usage.join(", ")}
        </div>
      ) : (
        <div class={styles.usageEmpty}>{t(lang, "notUsedYet")}</div>
      )}
    </div>
  );
}

const generatePath = (path, key) => `${path}>${key}`;

function CategoryNode({ node, lang, depth, path, collapsed, onToggle }) {
  const title = node.title?.[lang];
  const isOpen = !collapsed.has(path);

  return (
    <div class={depth === 0 ? styles.node : `${styles.node} ${styles.nested}`}>
      {title && (
        <button
          type="button"
          class={styles.nodeHeader}
          data-depth={depth}
          style={{ paddingLeft: `${8 + depth * 12}px` }}
          onClick={() => onToggle(path)}
          aria-expanded={isOpen}
        >
          <span class={styles.chevron} data-open={isOpen}>
            ▸
          </span>
          <span class={styles.nodeTitle}>{title}</span>
          <span class={styles.nodeCount}>{categoryWordCount(node)}</span>
        </button>
      )}
      {(isOpen || !title) && (
        <div class={styles.nodeBody}>
          {node.children
            ? node.children.map((child) => (
                <CategoryNode
                  key={child.key}
                  node={child}
                  lang={lang}
                  depth={depth + 1}
                  path={generatePath(path, child.key)}
                  collapsed={collapsed}
                  onToggle={onToggle}
                />
              ))
            : node.wordIds.map((id) => (
                <WordEntry key={id} id={id} lang={lang} />
              ))}
        </div>
      )}
    </div>
  );
}

export function CategoricalDictionarySection({ lang }) {
  const [collapsed, setCollapsed] = useState(
    new Set([
      ...dictionary.categories.map((c) => c.key),
      ...dictionary.categories.flatMap((c) =>
        c.children?.map((child) => generatePath(c.key, child.key)),
      ),
    ]),
  );

  function onToggle(path) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <div class={styles.tree}>
      {dictionary.categories.map((category) => (
        <CategoryNode
          key={category.key}
          node={category}
          lang={lang}
          depth={0}
          path={category.key}
          collapsed={collapsed}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
