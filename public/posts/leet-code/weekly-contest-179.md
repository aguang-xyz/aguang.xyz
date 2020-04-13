# Leet Code Weekly Contest 179

## 1. [Generate a String With Characters That Have Odd Counts](https://leetcode.com/contest/weekly-contest-179/problems/generate-a-string-with-characters-that-have-odd-counts/)

One simple solution could be:

$$
\text{answer} = \begin{cases}
\underbrace{\text{a}, \dots, \text{a}}_n, \text{b} & n \mod 2 = 0 \\
\underbrace{\text{a}, \dots, \text{a}}_n & n \mod 2 = 1 \\

\end{cases}
$$

```c++
class Solution {
public:
    string generateTheString(int n) {
        
        string result = "";
        
        if (n % 2 == 0) {
            
            for (int i = 1; i <= (n - 1); i++) result += "a";
            
            result += "b";
        } else {
            
            for (int i = 1; i <= n; i++) result += "a";
        }
        
        return result;
    }
};
```

## 2. [Bulb Switcher III](https://leetcode.com/contest/weekly-contest-179/problems/bulb-switcher-iii/)

Let's say:

$$
s_i =
  \begin{cases}
    1 & light_i\text{ is currently on} \\
    0 & light_i\text{ is currently off} \\
  \end{cases}
$$

After $k$ lights have been turned on, $\sum_{i = 1}^{k} s_{i} = k$ indicates
that all lights are blue.

Then you need some kind of data structure to update values and query preffix
sums efficiently.

[Fenwick Tree](#/post/algorithms/fenwick-tree) is a good choice.

```c++
class bit {

  public:

    int * sum, size;

  bit(int size) {

    this -> size = size;
    this -> sum = new int[size + 1];

    for (int i = 0; i <= size; i++) {

      this -> sum[i] = 0;
    }
  }

  void add(int pos, int value) {

    while (pos <= this -> size) {

      sum[pos] += value;
      pos += (pos & (-pos));
    }
  }

  int query(int pos) {

    int result = 0;

    while (pos > 0) {

      result += sum[pos];
      pos -= (pos & (-pos));
    }

    return result;
  }
};

class Solution {
public:
    int numTimesAllBlue(vector<int>& light) {

        int ans = 0;
        
        bit s(light.size());
        
        for (int i = 0; i < light.size(); i++) {
            
            s.add(light[i], 1);
            
            if (s.query(i + 1) == (i + 1)) {
                
                ans++;
            }
        }
        
        return ans;
    }
};
```

## 3. [Time Needed to Inform All Employees](https://leetcode.com/contest/weekly-contest-179/problems/time-needed-to-inform-all-employees/)

Dynamic programming on trees.

$$
f(i) =
	\begin{cases}
		time_{i} + \max \{ f(c) \mid c \in \text{Children}_i \} & \text{Children}_i \neq \empty\\
		time_{i} & \text{Children}_i = \empty\\
	\end{cases}
$$

```c++
class Solution {
public:
    vector<int> children[100000];
    
    int f(int id, vector<int>& informTime) {
        
        int time = 0;
        
        for (int &child : children[id]) {
            
            int t = f(child, informTime);
            
            if (t > time) {
                
                time = t;
            }
        }
        
        return time + informTime[id];
    }
    
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        
        for (int i = 0; i < n; i++) {
            
            if (manager[i] != -1) {
                
                children[manager[i]].push_back(i);
            }
        }
        
        return f(headID, informTime);
    }
};
```

## 4. [Frog Position After T Seconds](https://leetcode.com/contest/weekly-contest-179/problems/frog-position-after-t-seconds/)

Since it is a tree, there is at most one path from the vertex `1` to the vertex
`target`. So just `DFS` and store these information below:

* $\text{second}_i$: the arrive time on the vertex $i$.
* $\text{visited}_i$: whether the vertex $i$ has been visited.
* $\text{isForever}_i$: whether the vertex $i$ is a leaf node.

```c++
class Solution {
public:
    vector<int> neighbors[101];
    
    float probability[101];
    bool is_forever[101], visited[101];
    int second[101];
    
    void dfs(int id, float p, int t) {
        
        probability[id] = p;
        visited[id] = true;
        is_forever[id] = true;
        second[id] = t;
        
        int cnt = 0;
        
        for (int &next : neighbors[id]) {
            
            if (!visited[next]) {
                
                cnt++;
            }
        }
        
        is_forever[id] = (cnt == 0);
        
        
        for (int &next : neighbors[id]) {
            
            if (!visited[next]) {
                
                dfs(next, p / cnt, t + 1);
            }
        }
    }
    
    double frogPosition(int n, vector<vector<int>>& edges, int t, int target) {
        
        for (vector<int> &edge : edges) {
            
            neighbors[edge[0]].push_back(edge[1]);
            neighbors[edge[1]].push_back(edge[0]);
        }
        
        for (int i = 0; i < n; i++) {
            
            visited[i] = false;
            probability[i] = 0;
        }
        
        dfs(1, 1, 0);
        
        return (visited[target] && (t == second[target] || (t > second[target] && is_forever[target]))) ?
            probability[target] : 0;
        
    }
};
```
