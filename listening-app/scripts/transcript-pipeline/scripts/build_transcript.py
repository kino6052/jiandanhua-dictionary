#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convert an SRT file into the C:/P:/E: bracketed transcript format described
in ../FORMAT.md, using jieba for word segmentation, CC-CEDICT for pinyin +
English glosses, and pypinyin as a fallback for anything not in CC-CEDICT.

Usage: python3 build_transcript.py <input.srt> <output_transcript.txt>

If a word comes out wrong (bad segmentation, wrong reading, wrong gloss),
add or correct an entry in OVERRIDES below and rerun -- run.py reruns this
for every pair each time, so fixes apply retroactively. Run this file's
stderr for "UNRESOLVED WORDS" -- those are characters with no CC-CEDICT
entry at all and are the highest-value ones to fix.
"""
import re
import sys
import jieba
from pypinyin import lazy_pinyin, Style
from cedict_utils.cedict import CedictParser

CJK_RE = re.compile(r'^[\u4e00-\u9fff]+$')

def load_cedict():
    parser = CedictParser()
    entries = parser.parse()
    d = {}
    for e in entries:
        d.setdefault(e.simplified, []).append((e.pinyin, e.meanings))
    return d

CEDICT = load_cedict()

# Force these multi-character strings to segment as single tokens (proper
# nouns, units, fixed expressions jieba would otherwise split badly).
# Add to this list whenever you see a real word getting cut in half.
FORCE_WORDS = [
    "千米", "公里", "厘米", "毫米", "米", "千克", "公斤",
]
for w in FORCE_WORDS:
    jieba.add_word(w)

# Discourage jieba from merging these into single bad tokens (force a split
# at the given character boundary). Add pairs here when two unrelated
# characters keep getting glued into one bogus "word".
for pair in []:
    jieba.suggest_freq(pair, tune=True)

# Manual overrides for common function words / particles / pronouns where we
# want a crisp, standard gloss rather than CC-CEDICT's first (sometimes
# verbose or context-mismatched) sense, plus fixes for pinyin readings
# CC-CEDICT or jieba get wrong out of context (heteronyms like 说/长/要/看).
# Key = exact Chinese word as it will appear inside a bracket.
# Value = (pinyin with tone numbers, short English gloss).
OVERRIDES = {
    "的": ("de5", "'s/of"),
    "了": ("le5", "(completed action)"),
    "是": ("shi4", "to be"),
    "在": ("zai4", "at/in"),
    "我们": ("wo3 men5", "we"),
    "你": ("ni3", "you"),
    "也": ("ye3", "also"),
    "就": ("jiu4", "then/just"),
    "都": ("dou1", "all"),
    "这": ("zhe4", "this"),
    "那": ("na4", "that"),
    "一个": ("yi2 ge4", "a/one"),
    "有": ("you3", "to have"),
    "没有": ("mei2 you3", "to not have"),
    "没": ("mei2", "not"),
    "很": ("hen3", "very"),
    "还": ("hai2", "still/also"),
    "和": ("he2", "and"),
    "跟": ("gen1", "with"),
    "对": ("dui4", "towards/correct"),
    "对于": ("dui4 yu2", "regarding"),
    "所以": ("suo3 yi3", "so/therefore"),
    "但是": ("dan4 shi4", "but"),
    "但": ("dan4", "but"),
    "因为": ("yin1 wei4", "because"),
    "如果": ("ru2 guo3", "if"),
    "可是": ("ke3 shi4", "however"),
    "可以": ("ke3 yi3", "can/may"),
    "觉得": ("jue2 de5", "to feel/think"),
    "已经": ("yi3 jing1", "already"),
    "其实": ("qi2 shi2", "actually"),
    "主要": ("zhu3 yao4", "mainly"),
    "什么": ("shen2 me5", "what"),
    "怎么": ("zen3 me5", "how"),
    "到底": ("dao4 di3", "after all/exactly"),
    "长度": ("chang2 du4", "length"),
    "长": ("chang2", "long"),
    "得": ("de5", "(complement particle)"),
    "着": ("zhe5", "(continuous aspect particle)"),
    "过": ("guo4", "(experiential aspect particle)"),
    "地方": ("di4 fang5", "place"),
    "地": ("de5", "(adverbial particle)"),
    "为": ("wei4", "for/as"),
    "为了": ("wei4 le5", "in order to"),
    "以": ("yi3", "with/by means of"),
    "以后": ("yi3 hou4", "after/afterwards"),
    "以下": ("yi3 xia4", "below"),
    "以前": ("yi3 qian2", "before"),
    "还有": ("hai2 you3", "also/in addition"),
    "而且": ("er2 qie3", "moreover"),
    "而": ("er2", "and/but"),
    "又": ("you4", "again"),
    "才": ("cai2", "only then"),
    "再": ("zai4", "again"),
    "最": ("zui4", "most"),
    "很多": ("hen3 duo1", "many"),
    "多": ("duo1", "many/more"),
    "少": ("shao3", "few/less"),
    "或": ("huo4", "or"),
    "现在": ("xian4 zai4", "now"),
    "当时": ("dang1 shi2", "at that time"),
    "目前": ("mu4 qian2", "currently"),
    "去": ("qu4", "to go"),
    "来": ("lai2", "to come"),
    "到": ("dao4", "to arrive/until"),
    "进": ("jin4", "to enter"),
    "回": ("hui2", "to return"),
    "上": ("shang4", "on/up"),
    "下": ("xia4", "down/under"),
    "里": ("li3", "inside"),
    "里面": ("li3 mian4", "inside"),
    "外": ("wai4", "outside"),
    "之": ("zhi1", "(literary possessive)"),
    "之一": ("zhi1 yi1", "one of"),
    "之后": ("zhi1 hou4", "after"),
    "人": ("ren2", "person"),
    "人类": ("ren2 lei4", "humankind"),
    "我": ("wo3", "I"),
    "他": ("ta1", "he"),
    "他们": ("ta1 men5", "they"),
    "它": ("ta1", "it"),
    "自己": ("zi4 ji3", "oneself"),
    "整个": ("zheng3 ge4", "whole/entire"),
    "只": ("zhi3", "only"),
    "只有": ("zhi3 you3", "only have"),
    "只是": ("zhi3 shi4", "just/merely"),
    "只要": ("zhi3 yao4", "as long as"),
    "不": ("bu4", "not"),
    "不好": ("bu4 hao3", "not good"),
    "了解": ("liao3 jie3", "to understand"),
    "应该": ("ying1 gai1", "should"),
    "吧": ("ba5", "(suggestion particle)"),
    "呢": ("ne5", "(question particle)"),
    "吗": ("ma5", "(yes/no question particle)"),
    "呀": ("ya5", "(exclamatory particle)"),
    "啊": ("a5", "(exclamatory particle)"),
    "哦": ("o5", "oh"),
    "喔": ("wo5", "oh"),
    "咯": ("lo5", "(assertive particle)"),
    "嗯": ("en4", "um"),
    "诶": ("ei4", "hey"),
    "啦": ("la5", "(sentence-final particle)"),
    "然后": ("ran2 hou4", "then"),
    "虽然": ("sui1 ran2", "although"),
    "个": ("ge4", "(general measure word)"),
    "位": ("wei4", "(polite measure word for people)"),
    "一下": ("yi2 xia4", "a little bit/just a moment"),

    # Units
    "米": ("mi3", "meter"),
    "千米": ("qian1 mi3", "kilometer"),
    "公里": ("gong1 li3", "kilometer"),
    "厘米": ("li2 mi3", "centimeter"),
    "毫米": ("hao2 mi3", "millimeter"),
    "千克": ("qian1 ke4", "kilogram"),
    "公斤": ("gong1 jin1", "kilogram"),

    # Common heteronyms / particles where CC-CEDICT's top sense is wrong
    # for normal spoken/narrated Mandarin.
    "号": ("hao4", "(ship/name suffix); number"),
    "占": ("zhan4", "to occupy/constitute"),
    "所": ("suo3", "(nominalizing particle)"),
    "被": ("bei4", "(passive marker)"),
    "深": ("shen1", "deep"),
    "会": ("hui4", "would/will"),
    "要": ("yao4", "to want/will"),
    "看": ("kan4", "to look/see"),
    "后": ("hou4", "after/later"),
    "于": ("yu2", "at/to (literary)"),
    "等": ("deng3", "to wait"),
    "好": ("hao3", "good"),
    "船": ("chuan2", "boat"),
    "说": ("shuo1", "to say/speak"),
    "开放": ("kai1 fang4", "open"),
    "底": ("di3", "bottom/basis"),
    "成功": ("cheng2 gong1", "successfully/success"),
    "装": ("zhuang1", "to fit/pack"),
    "不了": ("bu4 liao3", "cannot"),
    "场": ("chang3", "(measure word for events)"),
    "才能": ("cai2 neng2", "only then can"),
    "峰": ("feng1", "peak/summit"),
}

BAD_GLOSS_PREFIXES = ("surname ", "variant of ", "see ", "abbr. for ", "old variant of ",
                       "archaic variant of ", "used in", "(bound form)")

def _score_entry(pinyin, meanings):
    gloss = meanings[0]
    penalty = 0
    if gloss.startswith(BAD_GLOSS_PREFIXES):
        penalty += 10
    if "surname" in gloss.lower():
        penalty += 5
    return penalty

def cedict_lookup(word):
    if word in OVERRIDES:
        return OVERRIDES[word]
    if word in CEDICT:
        candidates = CEDICT[word]
        best = min(candidates, key=lambda pm: _score_entry(*pm))
        pinyin, meanings = best
        gloss = meanings[0]
        gloss = re.split(r'[;,(]', gloss)[0].strip()
        gloss = gloss.replace('CL:', '').strip()
        if not gloss:
            gloss = meanings[0]
        return (pinyin.lower(), gloss)
    return None

def pypinyin_fallback(word):
    py = lazy_pinyin(word, style=Style.TONE3, neutral_tone_with_five=True)
    return " ".join(py)

def gloss_word(word):
    hit = cedict_lookup(word)
    if hit:
        return hit
    # Unknown multi-char word: fall back to per-character glosses joined
    # with "-". Flagged as unresolved so it shows up in the stderr report.
    pys, glosses = [], []
    for ch in word:
        hit = cedict_lookup(ch)
        if hit:
            pys.append(hit[0])
            glosses.append(hit[1])
        else:
            pys.append(pypinyin_fallback(ch))
            glosses.append("???" + ch)
    return (" ".join(pys), "-".join(glosses))

def parse_srt(path):
    raw = open(path, encoding="utf-8").read().replace("\r\n", "\n")
    blocks = [b.strip() for b in re.split(r"\n\s*\n", raw) if b.strip()]
    out = []
    for b in blocks:
        lines = b.split("\n")
        idx = lines[0].strip()
        timerange = lines[1].strip()
        text = "\n".join(lines[2:]).strip()
        out.append((idx, timerange, text))
    return out

def build_block(idx, timerange, text):
    tokens = jieba.lcut(text, HMM=True)
    c_parts, p_parts, e_parts, unresolved = [], [], [], []
    raw_buf = []

    def flush_raw():
        if raw_buf:
            c_parts.append("".join(raw_buf).strip())
            raw_buf.clear()

    for tok in tokens:
        if CJK_RE.match(tok):
            flush_raw()
            pinyin, gloss = gloss_word(tok)
            c_parts.append(f"[{tok}]")
            p_parts.append(f"[{pinyin}]")
            e_parts.append(f"[{gloss}]")
            if "???" in gloss:
                unresolved.append(tok)
        else:
            raw_buf.append(tok)
    flush_raw()
    c_parts = [p for p in c_parts if p]
    c_line = "C: " + " ".join(c_parts)
    p_line = "P: " + " ".join(p_parts)
    e_line = "E: " + " ".join(e_parts)
    return f"{idx}\n{timerange}\n{c_line}\n{p_line}\n{e_line}", unresolved

def main():
    if len(sys.argv) != 3:
        print("Usage: build_transcript.py <input.srt> <output_transcript.txt>", file=sys.stderr)
        sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2]
    blocks = parse_srt(src)
    out_blocks = []
    all_unresolved = []
    for idx, timerange, text in blocks:
        block_str, unresolved = build_block(idx, timerange, text)
        out_blocks.append(block_str)
        if unresolved:
            all_unresolved.append((idx, text, unresolved))
    with open(dst, "w", encoding="utf-8") as f:
        f.write("\n\n".join(out_blocks) + "\n")
    if all_unresolved:
        print(f"UNRESOLVED WORDS ({len(all_unresolved)} blocks) -- add these to OVERRIDES:", file=sys.stderr)
        for idx, text, words in all_unresolved:
            print(f"  block {idx}: {text} -> {words}", file=sys.stderr)

if __name__ == "__main__":
    main()
