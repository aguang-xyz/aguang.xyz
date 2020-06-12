# Leet Code Weekly Contest 190

## 1. Check If a Word Occurs As a Prefix of Any Word in a Sentence

Naive.

```javascript
var isPrefixOfWord = function(sentence, searchWord) {
    
    return sentence
        .split(' ')
        .reduce((ans, word, idx) => 
            (ans == -1 && word.startsWith(searchWord)) ? (idx + 1) : ans
        , -1);
};
```

## 2. Maximum Number of Vowels in a Substring of Given Length.

Preffix-sum.

```javascript
const range = (l, r) => [...Array(r - l).keys()].map(x => x + l)
const cumsum = (arr) => arr.reduce((sum, x) => {
    
    sum.push(sum[sum.length - 1] + x);
    
    return sum;
}, [ 0 ]);

var maxVowels = function(s, k) {
    
    const is_vowel = s.split('').map(c => ('aeiou'.indexOf(c) !== -1) ? 1 : 0);
    
    const sum = cumsum(is_vowel);
    
    return Math.max.apply(Math, range(k, s.length + 1)
        .map(idx => sum[idx] - sum[idx - k]));
};
```

## 3. Pseudo-Palindromic Paths in a Binary Tree

Use DFS to iterate all paths from the root to leaf nodes.

At least one permutation of a given sequence is a palindrome if and only if
at most one element has odd frequency.


```javascript
let cnt = [...Array(9).keys()].map(() => 0);

const dfs = (root) => {

    let ans = 0;
    
    const val = root.val - 1;
    
    cnt[val]++;
    
    if (root.left) ans += dfs(root.left);
    
    if (root.right) ans += dfs(root.right);
    
    if (root.left === null && root.right === null) {
        
        if (cnt.reduce((sum, c) => (c % 2 == 0) ? sum : sum + 1, 0) <= 1) {
            
            ans++;
        }
    }
    
    cnt[val]--;
    
    return ans;
}

var pseudoPalindromicPaths  = function(root) {
    
    return dfs(root);
};
```

## 4. Max Dot Product of Two Subsequences

A simple DP problem.

```javascript
var maxDotProduct = function(nums1, nums2) {
    
    let cache = {};
    
    let f = (i, j, allowEmpty = false) => {
        
        if (i < 0 || j < 0) return allowEmpty ? 0 : -Infinity;
                
        if (cache[i + ',' + j + ',' + allowEmpty])
            return cache[i + ',' + j + ',' + allowEmpty];

        return cache[i + ',' + j + ',' + allowEmpty] = Math.max(
            f(i - 1, j - 1, true) + nums1[i] * nums2[j],
            f(i - 1, j, allowEmpty),
            f(i, j - 1, allowEmpty)
        );
    };
    
    return f(nums1.length - 1, nums2.length - 1);
};
```
