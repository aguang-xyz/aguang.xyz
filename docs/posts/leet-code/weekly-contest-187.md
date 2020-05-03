# Leet Code Weekly Contest 187

## 1. Destination City

Let's say,

* $S = \{ x \mid (x, y) \text{ is a path} \}$
* $T = \{ y \mid (x, y) \text{ is a path} \}$

The answer is $T - S$.

```c++
class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        
        set<string> s, t;
        
        for (const vector<string> &path : paths) {
            
            s.insert(path[0]);
            t.insert(path[1]);
        }
        
        for (const string &x : s) {
            
            t.erase(x);
        }
        
        return *(t.begin());
    }
};
```

## 2. Check If All 1's Are at Least Length K Places Away

Let's say $s(n) = \sum_{i = 1}^n num_i$, for every $i$ where $num_i = 1$, just
check:

* $s_{i - 1} - s_{max(i - k - 1, 0)} = 0$
* $s_{min(i + k, n)} - s[i] = 0$

```c++
class Solution {
public:
    int s[100001];
    
    bool kLengthApart(vector<int>& nums, int k) {

        int n = nums.size();
        
        s[0] = 0;
        
        for (int i = 0; i < n; i++) {
            
            s[i + 1] = s[i] + nums[i];
        }
        
        for (int i = 1; i <= n; i++) {
            
            if (nums[i - 1] == 1) {
                
                if (i > 1 && s[i - 1] - s[max(i - k - 1, 0)] > 0) {
                    
                    return false;
                }
                
                
                if (i < n && s[min(i + k, n)] - s[i] > 0) {
                    
                    return false;
                }
            }
        }
        
        return true;
    }
};
```

## 3. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Greedy strategy; use a balanced tree to maintain the maximum value and the
minimum value of the current sequence. Every time you just push the next number
from the right side, and pop left values until the sequence meets the
requirement.

```c++
class Solution {
public:
    
    int longestSubarray(vector<int>& nums, int limit) {

        multiset<int> s;
        queue<int> q;
        
        int n = nums.size();
        int ans = 0;
        
        for (int i = 0; i < n; i++) {
            
            s.insert(nums[i]);
            q.push(nums[i]);
            
            while (*(s.rbegin()) - *(s.begin()) > limit) {
                
                s.erase(s.lower_bound(q.front()));
                
                q.pop();
            }
            
            if (q.size() > ans) ans = q.size();
        }
        
        return ans;
    }
};
```

### 4. Find the Kth Smallest Sum of a Matrix With Sorted Rows

BFS with heap (or you can call it A* algorithm).

```c++
class Solution {
public:
    
    struct state {
        
        int sum;
        
        vector<int> pos;
    };
    
    struct cmp {
        
        bool operator() (state &x, state &y) {
            
            return x.sum > y.sum;
        }
    };
    
    state init_state(int n, vector<vector<int>>& mat) {
        
        state s0;
        
        s0.sum = 0;
        
        for (int i = 0; i < n; i++) {
            
            s0.sum += mat[i][0];
            
            s0.pos.push_back(0);
        }
        
        return s0;
    }
    
    state copy_state(state s) {
        
        state s2;
        
        s2.sum = s.sum;
        
        for (int i = 0; i < s.pos.size(); i++) {
            
            s2.pos.push_back(s.pos[i]);
        }
        
        return s2;
    }
    
    int kthSmallest(vector<vector<int>>& mat, int k) {
        
        int n = mat.size();
        int m = mat[0].size();
        
        set<vector<int>> visited;
        priority_queue<state, vector<state>, cmp> q;
        
        state s0 = init_state(n, mat);
        
        visited.insert(s0.pos);
        q.push(s0);
        
        for (int i = 0; i < (k - 1); i++) {
            
            state s = q.top();
        
            for (int j = 0; j < n; j++) {
                
                if (s.pos[j] < (m - 1)) {
                    
                    state s2 = copy_state(s);
                    
                    s2.sum -= mat[j][s2.pos[j]];
    
                    s2.sum += mat[j][++(s2.pos[j])];
                    
                    if (visited.find(s2.pos) == visited.end()) {
                        
                        q.push(s2);
                        
                        visited.insert(s2.pos);
                    }
                }
            }
            
            q.pop();
        }
        
        return q.top().sum;
    }
};
```
