# Leet Code Weekly Contest 191

## 1. Maximum Product of Two Elements in an Array

Naive.

```c++
class Solution {
public:
    int maxProduct(vector<int>& nums) {
    
      int ans = 0;
      
      for (int i = 0; i < nums.size(); i++)
        for (int j = i + 1; j < nums.size(); j++)
          ans = max(ans, (nums[i] - 1) * (nums[j] - 1));
      
      return ans;
    }
};
```

## 2. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts

```c++
class Solution {
public:
    int maxArea(int h, int w, vector<int>& horizontalCuts, vector<int>& verticalCuts) {
        
      sort(horizontalCuts.begin(), horizontalCuts.end());
      sort(verticalCuts.begin(), verticalCuts.end());

      int a = max(horizontalCuts[0], h - horizontalCuts[horizontalCuts.size() - 1]);
      
      for (int i = 1; i < horizontalCuts.size(); i++)
        a = max(a, horizontalCuts[i] - horizontalCuts[i - 1]);
      
      int b = max(verticalCuts[0], w - verticalCuts[verticalCuts.size() - 1]);
      
      for (int i = 1; i < verticalCuts.size(); i++)
        b = max(b, verticalCuts[i] - verticalCuts[i - 1]);
      
      return ((long long) a) * b % (1000000007);
    }
};
```

## 3. Reorder Routes to Make All Paths Lead to the City Zero

```c++

class Solution {
public:
    vector<int> dst[50001];
    vector<int> cost[50001];
  
    bool vis[50001];
  
    int ans = 0;
  
    void dfs(int x) {
      
      vis[x] = true;
      
      for (int i = 0; i < dst[x].size(); i++)
        if (!vis[dst[x][i]]) {
          ans += cost[x][i];
          
          dfs(dst[x][i]);
        }
    }
  
    int minReorder(int n, vector<vector<int>>& connections) {
        
      for (vector<int> &conn : connections) {
        
        dst[conn[0]].push_back(conn[1]);
        cost[conn[0]].push_back(1);
        
        dst[conn[1]].push_back(conn[0]);
        cost[conn[1]].push_back(0);
      }
      
      for (int i = 0; i < n; i++)
        vis[i] = false;
      
      dfs(0);
      
      return ans;
    }
};
```

## 4. Probability of a Two Boxes Having The Same Number of Distinct Balls

TODO 
