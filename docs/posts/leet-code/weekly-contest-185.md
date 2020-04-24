# Leet Code Weekly Contest 185

## 1. Reformat The String

Divide the characters into two groups: `digits` and `letters`, just try
`digits` first or `letters` first.

```c++
class Solution {
public:
    string reformat(string s) {
        
        string s1 = "";
        string s2 = "";
        
        for (int i = 0; i < s.length(); i++) {
            
            if (s[i] >= '0' && s[i] <= '9') s1 += s[i];
            else s2 += s[i];
        }
        
        string ret = "";
        
        bool failed = false;
        
        for (int i = 0, j = 0; i < s1.length() || j < s2.length(); ) {
            
            if (ret.length() == 0 || (ret[ret.length() - 1] >= '0' && ret[ret.length() - 1] <= '9')) {
                
                if (j < s2.length()) {
                    
                    ret += s2[j++];
                } else {
                    
                    failed = true;
                    
                    break;
                }
            } else {
                
                if (i < s1.length()) {
                    
                    ret += s1[i++];
                } else {
                    
                    failed = true;
                    
                    break;
                }
            }
        }
        
        if (!failed) return ret;
        
        ret = "";
    
        
        failed = false;
        
        for (int i = 0, j = 0; i < s1.length() || j < s2.length(); ) {

            
            if (ret.length() == 0 || (ret[ret.length() - 1] >= 'a' && ret[ret.length() - 1] <= 'z')) {
                
                if (i < s1.length()) {
                    
                    ret += s1[i++];
                } else {
                    
                    failed = true;
                    
                    break;
                }

            } else {
                
                if (j < s2.length()) {
                    
                    ret += s2[j++];
                } else {
                    
                    failed = true;
                    
                    break;
                }

            }
        }
        
        return failed ? "" : ret;
    }
};
```

## 2. Display Table of Food Orders in a Restaurant

No need to talk if you use STL.

```c++
class Solution {
public:
    vector<vector<string>> displayTable(vector<vector<string>>& orders) {

        set<string> names;
        
        set<int> ids;
        
        map<int, map<string, int>> order;
        
        for (int i = 0; i < orders.size(); i++) {
            
            string &name = orders[i][2];
            
            names.insert(name);
            
            int id = stoi(orders[i][1]);
            
            if (order.find(id) == order.end()) {
                
                order[id] = map<string, int>();
            }
            
            if (order[id].find(name) == order[i].end()) {
                
                order[id][name] = 0;
            }
            
            order[id][name]++;
            
            ids.insert(id);
        }
        
        vector<vector<string>> ret;
        
        vector<string> row0;
        
        row0.push_back("Table");
        
        for (auto i = names.begin(); i != names.end(); i++) {
            
            row0.push_back(*i);
        }
        
        ret.push_back(row0);
        
        for (auto i = ids.begin(); i != ids.end(); i++) {
            
            vector<string> row1;
            
            row1.push_back(to_string(*i));
            
            for (auto j = names.begin(); j != names.end(); j++) {
                
                row1.push_back(to_string(order[*i][*j]));
            }
            
            ret.push_back(row1);
        }
        
        return ret;
    }
};
```

## 3. Minimum Number of Frogs Croaking

Use a array $Count_i$ to represent the number of frogs waiting for the `ith`
character in string `"croak"`.

Every time when you scan a new character, just check if there is at least one
frog waiting.

If there is no frog waiting and the character is not `c`, that means no
solution. Or, just add one new frog.

Don't forget to check if there is a frog not waiting for `c` after scanning all
characters.

```c++
class Solution {
public:
    int minNumberOfFrogs(string croakOfFrogs) {
        
        int count[5];
        
        for (int i = 0; i < 5; i++) {
            
            count[i] = 0;
        }
        
        int ans = 0;
        
        for (int i = 0, c; i < croakOfFrogs.length(); i++) {
            
            switch (croakOfFrogs[i]) {
                    
                case 'c':
                    c = 0;
                    break;
                
                case 'r':
                    c = 1;
                    break;
                    
                case 'o':
                    c = 2;
                    break;
                    
                case 'a':
                    c = 3;
                    break;
                    
                case 'k':
                    c = 4;
                    break;
            }
            
            if (c == 0) {
                
                if (count[c] == 0) {
                    ++ans;
                    count[1]++;
                } else {
                    --count[c];
                    count[1]++;
                }
            } else {
                
                if (count[c] == 0) {
                    
                    return -1;
                }
                
                --count[c];
                ++count[(c + 1) % 5];
            }
        }
        
        for (int i = 1; i < 5; i++) {
            if (count[i] > 0) {
                
                return -1;
            }
        }
        
        return ans;
    }
};
```

## 4. Build Array Where You Can Find The Maximum Exactly K Comparisons

Let's say $F_{i, j, p}$ represents the number of arrays where the length is
$i$, the last element increasing `maximum_value` is $j$, and the result
`maximum_value` is $p$.

For any current status, basically we have two groups of choices:

  1. The last element isn't the element increasing `maximum_value`, and the
    number of possibilities is: $j \times F_{i - 1, j, p}$, because you can
    choose the value of `i-th` element from $1$ to $j$.
  2. The last element is the element increasing `maximum_value`, then the
    number of possibilities is: $ \sum_{q = 1}^{j - 1} F_{i - 1, q, p - 1} $,
    because the `i-th` element is $j$ and you can choose the value of `(i-1)-th`
    element from $1$ to $j - 1$

So, we have:

$$
F_{i, j, p} = j \times F_{i - 1, j, p} + \sum_{q = 1}^{j - 1} F_{i - 1, q, p - 1}
$$

There is a small trick: if you loop $p$ first instead of $j$, you can
calculate current $F_{i, j, p}$ and count the sum together.

```c++
class Solution {

    long f[51][101][51];

    long MOD = 1E9 + 7; 

public:
    int numOfArrays(int n, int m, int k) {

        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= m; j++)
                for (int p = 0; p <= k; p++)
                    f[i][j][p] = 0;

        for (int i = 1; i <= m; i++)
            f[1][i][1] = 1;

        for (int i = 2; i <= n; i++) {
            for (int p = 1; p <= i; p++) {
                long s = 0;

                for (int j = 1; j <= m; j++) {

                    f[i][j][p] = (s + j * f[i - 1][j][p]) % MOD;

                    s = (s + f[i - 1][j][p - 1]) % MOD;
                }
            }
        }

        int ans = 0;

        for (int i = 1; i <= m; i++) {

            ans = (ans + f[n][i][k]) % MOD;
        }

        return ans;
    }
};
```
