# Leet Code Weekly Contest 184

## 1. [String Matching in an Array](https://leetcode.com/contest/weekly-contest-184/problems/string-matching-in-an-array/)

KMP.

```c++
class kmp {

  public:
    
    static vector<int> pmt_of(string p) {

      vector<int> pmt = { -1 };

      for (int i = 0, j = -1; i < p.length(); ) {

        if (j == -1 || p[i] == p[j]) {

          ++i, pmt.push_back(++j);
        } else {

          j = pmt[j];
        }
      }

      return pmt;
    }

    static int first_of(string s, string p) {

      vector<int> pmt = pmt_of(p);

      int i = 0, j = 0;

      while (i < s.length() && j < (int) p.length()) {

        if (j == -1 || s[i] == p[j]) {

          ++i, ++j;
        } else {

          j = pmt[j];
        }
      }

      return j == (int) p.length() ? i - j : -1;
    }
};

class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        
        vector<string> result;
        
        for (int i = 0; i < words.size(); i++) {
            
            bool valid = false;
            
            for (int j = 0; j < words.size(); j++) {
                if (j != i) {
                    if (kmp::first_of(words[j], words[i]) != -1) {
                        valid = true;
                        break;
                    }   
                }
            }
            
            if (valid) {
                result.push_back(words[i]);
            }
        }
        
        return result;
    }
};
```

## 2. [Queries on a Permutation With Key](https://leetcode.com/contest/weekly-contest-184/problems/queries-on-a-permutation-with-key/)

No need to talk.

```c++
class Solution {
public:
    vector<int> processQueries(vector<int>& queries, int m) {
    
        vector<int> result, ret;
        
        for (int i = 1; i <= m; i++) {
            
            result.push_back(i);
        }
        
        for (int i = 0; i < queries.size(); i++) {
            
            for (int j = 0; j < result.size(); j++) {
                
                if (result[j] == queries[i]) {
                    
                    ret.push_back(j);
                    
                    for (int k = j; k > 0; k--) result[k] = result[k - 1];
                    
                    result[0] = queries[i];
                    
                    break;
                }
            }
            
        }
        
        return ret;
    }
};
```

## 3. [HTML Entity Parser](https://leetcode.com/contest/weekly-contest-184/problems/html-entity-parser/)

No need to talk.

```c++
class Solution {
public:
    string entityParser(string text) {
        
        string x[6] = {"&quot;", "&apos;", "&amp;", "&gt;", "&lt;", "&frasl;"};
        string y[6] = {"\"", "\'", "&", ">", "<", "/"};
        
        string result = "";
        
        int l = text.length();
        
        for (int i = 0; i < l;) {
            
            bool matched = false;
        
            for (int j = 0; j < 6; j++) {
                
                int k;
                
                for (k = 0; k < x[j].length() && k < l; k++) {
                    
                    if (x[j][k] != text[i + k]) break;
                }
                
                if (k == x[j].length()) {
                    
                    matched = true;
                    
                    result += y[j];
                    
                    i += x[j].length();
                    
                    break;
                }
            }
        
            if (!matched) {
                
                result += text[i++];
            }
        }
    
        return result;
    }
};
```

## 4. [Number of Ways to Paint N × 3 Grid](https://leetcode.com/contest/weekly-contest-184/problems/number-of-ways-to-paint-n-3-grid/)

State Compression & DP.

Briefly you can use no more than six bit to represent the state of a row.

$$
F[1][c_1][c_2][c_3] = \begin{cases}
  1 & c_1 \neq c_2 \land c_2 \neq c_3 \\
  0 & \text{otherwise} \\
\end{cases}
$$

$$
F[i][c_1][c_2][c_3] = \begin{cases}
  \sum_{} F[i - 1][p_1][p_2][p_3] & c_1 \neq c_2 \land c_2 \neq c_3 \land c_1 \neq p_1 \land c_2 \neq p_2 \land c_3 \neq p_3 \\
  0 & \text{otherwise} \\
\end{cases}
$$

Then, you just calculate:

$$
\sum_{} F[n][c_1][c_2][c_3]
$$

```c++
class Solution {
    
public:
    
    int c1(int s) {
        
        return (s / 16) % 4;
    }
    
    int c2(int s) {
        
        return (s / 4) % 4;
    }
    
    int c3(int s) {
        
        return s % 4;
    }
    
    int to_state(int c1, int c2, int c3) {
        
        return c1 * 16 + c2 * 4 + c3;
    }
    
    int numOfWays(int n) {
        
        int f[5001][64];
        
        for (int c1 = 0; c1 < 3; c1++) {
            for (int c2 = 0; c2 < 3; c2++) {
                for (int c3 = 0; c3 < 3; c3++) {
                    
                    if (c1 != c2 && c2 != c3) {
                    
                        f[1][to_state(c1, c2, c3)] = 1;
                    } else {
                        
                        f[1][to_state(c1, c2, c3)] = 0;
                    }
                }
            }
        }
        
        for (int i = 2; i <= n; i++) {
            for (int c1 = 0; c1 < 3; c1++) {
                for (int c2 = 0; c2 < 3; c2++) {
                    for (int c3 = 0; c3 < 3; c3++) {
                        
                        int s = to_state(c1, c2, c3);
                        
                        f[i][s] = 0;
                        
                        if (c1 != c2 && c2 != c3) {
                            for (int p1 = 0; p1 < 3; p1++) {
                                for (int p2 = 0; p2 < 3; p2++) {
                                    for (int p3 = 0; p3 < 3; p3++) {
                                        if (c1 != p1 && c2 != p2 && c3 != p3) {
                                            
                                            f[i][s] = (f[i][s] + f[i - 1][to_state(p1, p2, p3)]) % 1000000007;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
                    
        int ans = 0;
        
        for (int c1 = 0; c1 < 3; c1++) {
            for (int c2 = 0; c2 < 3; c2++) {
                for (int c3 = 0; c3 < 3; c3++) {
                    ans = (ans + f[n][to_state(c1, c2, c3)]) % 1000000007;
                }
            }
        }
                             
        return ans;          
    }
};
```

