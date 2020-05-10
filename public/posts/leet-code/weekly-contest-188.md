# Leet Code Weekly Contest 188

## 1. Build an Array With Stack Operations

Stack is a FIFO container. Pop all useless elements before pushing the next
element.

```c++
class Solution {
public:
    vector<string> buildArray(vector<int>& target, int n) {

        bool useful[101];
        
        for (int i = 0; i < 101; i++)
            useful[i] = false;
        
        for (int &x : target)
            useful[x] = true;
        
        stack<int> s;
        
        vector<string> result;
        
        for (int i = 1; i <= n; i++) {
            
            while (s.size() > 0 && useful[s.top()] == false) {
                
                s.pop();
                result.push_back("Pop");
            }
            
            s.push(i);
            result.push_back("Push");
            
            if (s.size() == target.size() && useful[s.top()])
                break;
        }
        
        return result;
    }
};
```

## 2. Count Triplets That Can Form Two Arrays of Equal XOR

Since $x \oplus y \oplus x = y$, we can use a preffix-like array,
$S_n = \bigoplus_{i = 1}^n a_i$.

For every $1 \leq i, j \leq n$,
$\bigoplus_{p = i}^{j} a_p = S_j \oplus S_{i - 1}$ can be calculated in $O(1)$.


```c++
class Solution {
public:
    int s[301];
    
    int countTriplets(vector<int>& arr) {
        
        s[0] = 0;
        
        for (int i = 0; i < arr.size(); i++)
            s[i + 1] = s[i] ^ arr[i];
        
        int ans = 0;
        
        for (int i = 1; i <= arr.size(); i++) {
            for (int j = i + 1; j <= arr.size(); j++) {
                for (int k = j; k <= arr.size(); k++) {
                    
                    int a = s[j - 1] ^ s[i - 1];
                    int b = s[k] ^ s[j - 1];
                    
                    if (a == b) {
                        
                        ans++;
                        
                        // cout<<(i - 1)<<","<<(j - 1)<<","<<(k - 1)<<endl;
                    }
                }
            }
        }
        
        return ans;
    }
};
```

## 3. Minimum Time to Collect All Apples in a Tree

Recurrence relation.

$$
  F(x) = \sum_{c \in Children(x)\ \land \ tree(c) \text{ has apples}} {F(c) + 2}
$$


```c++
class Solution {
public:
    
    vector<int> children[100001];
    
    bool apple[100001];
    
    void dfs(int x, bool &has, int &cost) {
        
        has = apple[x];
        cost = 0;
        
        bool c_has;
        int c_cost;
        
        for (int &c : children[x]) {
            
            dfs(c, c_has, c_cost);
         
            has = has || c_has;
            
            if (c_has) {
                
                cost += c_cost + 2;
            }
        }
    }
    
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        
        for (const vector<int> &e : edges)
            children[e[0]].push_back(e[1]);
        
        for (int i = 0; i < n; i++)
            apple[i] = hasApple[i];
        
        bool has;
        
        int cost;
        
        dfs(0, has, cost);
        
        return cost;
    }
};
```

## 4. Number of Ways of Cutting a Pizza

DP.

Let's say:

* $C(row1, col1, row2, col2)$ indicates the number of apples in a sub-matrix.
* $F(i, j, k)$ indicates the number of solutions to cut the pizza.

$C(row1, cols1, rows2, cols2)$ can be calculated in $O(n)$ if we pre-caculate
$S(i, j) = \sum_{k = 1}^j a_{i, j}$.

$$
\begin{aligned}

	F(i, j, k > 0) =& \sum_{p = i}^{n - 1} F(p + 1, j, k - 1) \mid C(i, j, p, j) > 0 \\
					+& \sum_{q = j}^{m - 1} F(i, q + 1, k - 1) \mid C(i, j, i, q) > 0 \\

	F(i, j, k = 0) =&
		\begin{cases}
			1 & C(i, j, n, m) > 0 \\
      0 & C(i, j, n, m) = 0 \\
		\end{cases}

\end{aligned}
$$

```c++
class Solution {
public:
    
    int s[51][51];
    
    int count(int row1, int col1, int row2, int col2) {
        
        int sum = 0;
        
        for (int i = row1; i <= row2; i++)
            sum += s[i][col2 + 1] - s[i][col1];
            
        return sum;
    }
    
    int f[51][51][11];
    
    int mod = 1000000007;
    
    int ways(vector<string>& pizza, int k) {
        
        int rows = pizza.size(), cols = pizza[0].size();
        
        for (int i = 0; i < rows; i++) {
            
            s[i][0] = 0;
            
            for (int j = 0; j < cols; j++)
                s[i][j + 1] = s[i][j] + (pizza[i][j] == 'A' ? 1 : 0);
        }
        
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                f[i][j][0] = count(i, j, rows - 1, cols - 1) > 0 ? 1 : 0;
        
        for (int p = 1; p < k; p++)
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++) {
                    
                    f[i][j][p] = 0;
                    
                    for (int q = j; q < cols; q++)
                        if (count(i, j, rows - 1, q) > 0)
                            f[i][j][p] = (f[i][j][p] + f[i][q + 1][p - 1]) % mod;
                    
                    for (int q = i; q < rows; q++)
                        if (count(i, j, q, cols - 1) > 0)
                            f[i][j][p] = (f[i][j][p] + f[q + 1][j][p - 1]) % mod;
                    
                }
        
        return f[0][0][k - 1];
    }
};

```
