# Leet Code Weekly Contest 186

## 1. Maximum Score After Splitting a String

Preffix-sum.

```c++
class Solution {
public:
    int maxScore(string s) {
        
        int s0[501],s1[501];
        
        s0[0] = s1[0] = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '0') {
                s0[i + 1] = s0[i] + 1;
                s1[i + 1] = s1[i];
            } else {
                s0[i + 1] = s0[i];
                s1[i + 1] = s1[i] + 1;
            }
        }
        
        int ans = 0;
        
        for (int i = 0; (i + 1) < s.length(); i++) {
            
            int l = s0[i + 1];
            int r = s1[s.length()] - s1[i + 1];
            
            if (l + r > ans) {
                
                ans = l + r;
            }
        }
        
        return ans;
    }
};
```

## 2. Maximum Points You Can Obtain from Cards

Preffix-sum.

```c++
class Solution {
public:
    int s[100001];
    
    int maxScore(vector<int>& cardPoints, int k) {

        s[0] = 0;
        
        for (int i = 1; i <= cardPoints.size(); i++)
            s[i] = s[i - 1] + cardPoints[i - 1];
        
        int ans = 0;
        
        for (int i = 0; i <= k; i++) {
            
            int l = s[i];
            int r = s[cardPoints.size()] - s[cardPoints.size() - (k - i)];
            
            if (l + r > ans)
                ans = l + r;
        }
        
        return ans;
    }
};
```

## 3. Diagonal Traverse II

Multi-field sort.

```c++
class Solution {
public:
    static bool cmp(pair<int, int> x, pair<int, int> y) {
    
        if ((x.first + x.second) < (y.first + y.second)) return true;
        if ((x.first + x.second) > (y.first + y.second)) return false;
        
        return x.second < y.second;
    }
    
    vector<int> findDiagonalOrder(vector<vector<int>>& nums) {

        vector<pair<int, int>> s;
        
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums[i].size(); j++) {
                s.push_back(make_pair(i, j));
            }
        }
        
        sort(s.begin(), s.end(), cmp);
        
        vector<int> ret;
        
        for (pair<int, int> p : s) {
            
            ret.push_back(nums[p.first][p.second]);
        }
        
        return ret;
    }
};
```

## 4.  Constrained Subset Sum

DP + Heap.

```c++
class Solution {
public:
    
    int f[100001];
    
    struct cmp {
        
        bool operator() (pair<int, int> x, pair<int, int> y) {
            
            return x.second < y.second;
        }
    };
    
    priority_queue<pair<int, int>, vector<pair<int, int>>, cmp> q;
    
    int constrainedSubsetSum(vector<int>& nums, int k) {
        
        int ans = -1E9;
        
        for (int i = 0; i < nums.size(); i++) {
            
            f[i] = nums[i];
         
            while (q.size() > 0) {
                
                const pair<int, int> &top = q.top();
                
                if (top.first >= (i - k)) {
                    
                    if (top.second + nums[i] > f[i]) {
                        
                        f[i] = top.second + nums[i];
                    }
                    
                    break;
                } else {
                    
                    q.pop();
                }
            }
            
            if (f[i] > ans) ans = f[i];
            
            q.push(make_pair(i, f[i]));
        }
        
        return ans;
    }
};
```
