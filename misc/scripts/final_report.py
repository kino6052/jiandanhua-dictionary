import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('src/dictionaries/dictionary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

all_cuts = set([
    # Batch 1 (95)
    '嗯','爱人','还','串','乙','结','流动','灰','虫子','喂','爆','甲',
    '紫','薄','兵','冻','园','季','弯','捕','末','池','爬','袋子','败','青','饼',
    '鲜','鼓','互相','严格','亿','令','会员','及','另','台','叶子','吸','咬','团',
    '困','守','宝','宽','怪','拍','摆','杀','洞','湿','烟','版','短','祝','种',
    '脱','腰','船','藏','距','逼','避','重','闭','雪','顺利','骗','黄金','兄弟',
    '从而','修','初','却','压','古','含','富','布','广','底','投','播','既然',
    '暗','替','桥','止','沿','派','湖','演','简直','编','龙',
    # Batch 2 (95)
    '久','代','刀','才','抓','数','朝','甜','紧','级','细','补','锅',
    '集','靠','领','香','价值','旅游','毕竟','玻璃','节日','规则','钥匙',
    '与','争','云','亚洲','传统','允许','凭','区','卫生','即使','原',
    '合适','响','唱','增','夜','够','姓','将','尤其','尽管','差不多','弱',
    '必','愿','推','救','整','无论','普通','曾','权','欧洲','治','消失',
    '渴','甚至','痛','盐','省','窗','组','经理','绝对','群','聪明','认真',
    '证','赢','跳舞','踢','软','追','退','酒','醒','随','非洲','骑','满',
    '深','河','掉','控制','状态','艺术','专业','之中','便','难道','于是',
    # Batch 3 (96)
    '冰','行','脖子','草','扔','亲','下课','味','海','背','胜','血','鸟',
    '内容','包括','同','哭','墙','实际','当作','文章','方向','某','步',
    '温度','灯','移','程度','算','类','美','肚子','蔬菜','表','见面','运',
    '造','任何','休息','健康','危险','工具','干净','肯定','花2','计划',
    '便宜','停','基本','大概','标准','植物','科学','社会','经常','经济',
    '自然','会','别','既','此','单','失去','至','顺','也许','亮','反',
    '反正','因此','实在','据','无','星星','本','果然','根本','生意','由于',
    '较','过去','通','静','面包','黄色','之间','使','全部','别的','合',
    '的确','确实','要是','自','需','安静','产',
    # Batch 4 (29 — after keeping 牛马羊狗蓝绿色)
    '意思','成功','星期','清楚','环境','继续','耳朵','语言','帮助',
    '由','跳','卖','指','平','严',
    '一生','保','其','准','安','安全','如','已','身','面','度','东','西','方',
])

# Un-cut critical words
all_cuts -= {'别的', '会'}

remaining_atomic = [w for w in data['atomicWords'] if w not in all_cuts]
allowed_chars = set()
for w in remaining_atomic:
    for ch in w:
        allowed_chars.add(ch)

print(f'=== FINAL COUNTS ===')
print(f'Total cuts: {len(all_cuts)}')
print(f'Remaining atomic words: {len(remaining_atomic)}')
print(f'Allowed chars: {len(allowed_chars)}')
print(f'Words: {len(remaining_atomic)}/{len(data["atomicWords"])} = {len(remaining_atomic)/len(data["atomicWords"])*100:.1f}%')
print(f'Chars: {len(allowed_chars)}/642 = {len(allowed_chars)/642*100:.1f}%')

# Print comma-separated array
chars_sorted = sorted(allowed_chars)
print(f'\n=== COMMA-SEPARATED CHARSET ({len(chars_sorted)} chars) ===')
print(', '.join(chars_sorted))

# Print remaining atomic words
print(f'\n=== REMAINING ATOMIC WORDS ({len(remaining_atomic)}) ===')
for w in sorted(remaining_atomic):
    print(w, end=' ')
print()
