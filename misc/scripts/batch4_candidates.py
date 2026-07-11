import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('src/dictionaries/dictionary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

all_cuts = set([
    '嗯','爱人','还','串','乙','结','流动','灰','虫子','喂','爆','甲',
    '紫','薄','兵','冻','园','季','弯','捕','末','池','爬','袋子','败','青','饼',
    '鲜','鼓','互相','严格','亿','令','会员','及','另','台','叶子','吸','咬','团',
    '困','守','宝','宽','怪','拍','摆','杀','洞','湿','烟','版','短','祝','种',
    '脱','腰','船','藏','距','逼','避','重','闭','雪','顺利','骗','黄金','兄弟',
    '从而','修','初','却','压','古','含','富','布','广','底','投','播','既然',
    '暗','替','桥','止','沿','派','湖','演','简直','编','龙',
    '久','代','刀','才','抓','数','朝','甜','紧','级','细','补','锅',
    '集','靠','领','香','价值','旅游','毕竟','玻璃','节日','规则','钥匙',
    '与','争','云','亚洲','传统','允许','凭','区','卫生','即使','原',
    '合适','响','唱','增','夜','够','姓','将','尤其','尽管','差不多','弱',
    '必','愿','推','救','整','无论','普通','曾','权','欧洲','治','消失',
    '渴','甚至','痛','盐','省','窗','组','经理','绝对','群','聪明','认真',
    '证','赢','跳舞','踢','软','追','退','酒','醒','随','非洲','骑','满',
    '深','河','掉','控制','状态','艺术','专业','之中','便','难道','于是',
    '冰','行','脖子','草','扔','亲','下课','味','海','背','胜','血','鸟',
    '内容','包括','同','哭','墙','实际','当作','文章','方向','某','步',
    '温度','灯','移','程度','算','类','美','肚子','蔬菜','表','见面','运',
    '造','任何','休息','健康','危险','工具','干净','肯定','花2','计划',
    '便宜','停','基本','大概','标准','植物','科学','社会','经常','经济',
    '自然','会','别','既','此','单','失去','至','顺','也许','亮','反',
    '反正','因此','实在','据','无','星星','本','果然','根本','生意','由于',
    '较','过去','通','静','面包','黄色','之间','使','全部','别的','合',
    '的确','确实','要是','自','需','安静','产',
])

# Un-cut these (keep atomic)
all_cuts -= {'别的', '会'}

remaining_atomic = [w for w in data['atomicWords'] if w not in all_cuts]
remaining_set = set(remaining_atomic)

# Build char usage count among remaining
char_usage = {}
for w in remaining_atomic:
    for ch in w:
        if ch not in char_usage:
            char_usage[ch] = []
        if w not in char_usage[ch]:
            char_usage[ch].append(w)

# For each remaining word, count unique chars (chars only in this word)
candidates = []
for w in remaining_atomic:
    entry = data['entries'].get(w, {})
    speaking = entry.get('speakingIndex', 0)
    writing = entry.get('writingIndex', 0)
    score = speaking + writing
    pinyin = entry.get('pinyin', '')

    unique_chars = 0
    unique_list = []
    for ch in set(w):
        if len(char_usage.get(ch, [])) == 1:
            unique_chars += 1
            unique_list.append(ch)

    candidates.append((w, pinyin, score, unique_chars, unique_list))

# Sort by: unique chars DESC (save more chars), then score ASC (less common first)
candidates.sort(key=lambda x: (-x[3], x[2]))

print(f'Remaining atomic: {len(remaining_atomic)}')
print(f'\n=== Top candidates with unique chars (best char savings) ===')
print(f'{"Word":<8} {"Pinyin":<12} {"Score":<6} {"Uniq":<5} {"Unique chars"}')
shown = 0
for w, pinyin, score, uniq, ulist in candidates:
    if uniq > 0 and shown < 60:
        print(f'{w:<8} {pinyin:<12} {score:<6} {uniq:<5} {" ".join(ulist)}')
        shown += 1

# Also show 0-unique-char words sorted by score
print(f'\n=== Words with 0 unique chars (word count only, no char savings) ===')
zero_uniq = [(w, p, s) for w, p, s, u, ul in candidates if u == 0]
zero_uniq.sort(key=lambda x: x[2])
for w, p, s in zero_uniq[:30]:
    print(f'  {w:<8} {p:<12} {s}')
