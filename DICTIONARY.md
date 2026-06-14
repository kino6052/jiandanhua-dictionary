# Preprocess Dictionary (one‑time)

Load your raw dictionary into efficient data structures.

Example of the dictionary:

#,Word,Pinyin,Part of speech,Simple Native‑Speaker Definition (in 简单话),isAtomic,modifyee,qualifiers,comment (native thinking & specificity note),speaking commonality index,writing commonality index,isIgnored
254,一,yī,number (one),(atomic – number 1),TRUE,—,—,Native thinks: “the number 1.” Basic number; atomic.,99,99,
1541,一一,yīyī,adverb,一个一个,FALSE,一个,一个,Native thinks: “one by one.”,65,65,
259,一下,yíxià,"number‑classifier (once, a little)",一次，一小点,FALSE,次,一,Native thinks: “one time; a little bit.” Not atomic; use 一次.,85,75,
262,一些,yìxiē,"number‑classifier (some, a few)",几个,FALSE,几个,—,Native thinks: “an indefinite number.” Not atomic; use 几个.,85,80,
1353,一代,yídài,noun (generation),一个时代的人,FALSE,人,时代,Native thinks: “people of the same era.” Not atomic; defined as 同一时期的人.,70,80,
171,一会儿,yíhuìr,number‑classifier/adverb (a while; soon),很短的时间,FALSE,时间,很短,Native thinks: “a short period of time.” Not atomic; defined via 时间 + 短.,85,70,
423,一共,yígòng,"adverb (altogether, in total)",加起来,FALSE,加,起来,Native thinks: “summed up.” Not atomic; defined as 加起来.,80,75,
1556,一再,yízài,adverb,很多次,FALSE,很多次,—,"Native thinks: “repeatedly, time and again.”",60,65,
865,一切,yíqiè,pronoun (everything),所有东西,FALSE,东西,所有,Native thinks: “all things.” Not atomic; defined as 所有东西.,75,85,
258,一半,yíbàn,number (half),分成两个一样的部分,FALSE,分,两个，一样,Native thinks: “one of two equal parts.” Not atomic; defined via 分 + 两个 + 一样.,80,80,
1565,一口气,yìkǒuqì,adverb,不停,FALSE,不停,—,"Native thinks: “in one breath, without a break.” Use 不停.",65,55,
1571,一同,yìtóng,adverb,一起,FALSE,一起,—,Native thinks: “together.” Use 一起.,65,65,

**Data structures needed:**

1. `atomicWords: Set<string>`  
   Contains all words where `isAtomic = TRUE`.

2. `definitions: Map<string, string>`  
   For non‑atomic words, store the  简单话 definition string

   The definition must use **only characters from the 536/496 allowed set**.

3. `allowedCharacters: Set<string>` – to validate definitions during dictionary creation. (so that we could fix dictionary as we go)

4. add part of speech (jieba tag)


