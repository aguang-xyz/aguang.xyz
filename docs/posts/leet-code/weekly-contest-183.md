# Leet Code Weekly Contest 183

## 1. [Minimum Subsequence in Non-Increasing Order](https://leetcode.com/contest/weekly-contest-183/problems/minimum-subsequence-in-non-increasing-order/)

Just sort.

```c++
#include<vector>

using namespace std;

template<typename T>
class quick_sort {

  public:

    static bool small_first(T &x, T&y) {

      return x < y;
    }
    
    static bool big_first(T &x, T&y) {

      return x > y;
    }

    static vector<T> sort(vector<T> &elements) {

      return sort(elements, small_first);
    }

    static vector<T> sort(vector<T> &elements, bool (*less_than)(T&, T&)) {

      sort(elements, 0, elements.size() - 1, less_than);

      return elements;
    }

  private:

    static void sort(vector<T> &elements, int l, int r, bool (*less_than)(T&, T&)) {

      if (l < r) {

        T mid = elements[l];

        int i = l, j = r;

        while (i < j) {

          while (i < j && less_than(mid, elements[j])) j--;

          if (i < j) {

            elements[i] = elements[j];

            i++;
          }

          while (i < j && less_than(elements[i], mid)) i++;

          if (i < j) {

            elements[j] = elements[i];

            j--;
          }
        }

        elements[i] = mid;

        sort(elements, l, i - 1, less_than);
        sort(elements, i + 1, r, less_than);
      }
    }
};

class Solution {
public:
    vector<int> minSubsequence(vector<int>& nums) {

        quick_sort<int>::sort(nums, quick_sort<int>::big_first);
        
        int sum = 0;
        for (int &num : nums) {
            
            sum += num;
        }
        
        vector<int> ret;
        
        for (int i = 0, now = 0; i < nums.size(); i++) {
            
            ret.push_back(nums[i]);
            
            now += nums[i];
            
            int rest = sum - now;
            
            if (now > rest) {
                
                break;
            }
        }
        
        return ret;
    }
};
```

## 2. [Number of Steps to Reduce a Number in Binary Representation to One](https://leetcode.com/contest/weekly-contest-183/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/)

No need to talk.

```c++
class Solution {
public:
    int numSteps(string s) {
        
        int times = 0;
        
        while (s != "1") {
            
            if (s[s.length() - 1] == '0') {
                
                s = s.substr(0, s.length() - 1);
            } else {
                
                int i;
                
                for (i = s.length() - 1; i >= 0; i--) {
                    
                    if (s[i] == '1') {
                        
                        s[i] = '0';
                    } else {
                        
                        s[i] = '1';
                        
                        break;
                    }
                }
                
                if (i == -1) {
                    
                    s = '1' + s;
                }
            }
            
            times++;
        }
        
        return times;
    }
};
```

## 3. [Longest Happy String](https://leetcode.com/contest/weekly-contest-183/problems/longest-happy-string/)

Let'say $F(i, j, k, s)$ represents wheather we can construct a string with `i`
character 'a', `j` character 'b' and `k` chracter 'c' and the continuously same
character suffix is `s`, where $s \in \{ a, aa, b, bb, c, cc \}$

Then the state transition equation is:

$$
F(i, j, k, a) =\begin{cases}
True & i = 1 \land j = 0 \land k = 0\\
  F(i - 1, j, k, b) \lor
  F(i - 1, j, k, bb) \lor
  F(i - 1, j, k, c) \lor
  F(i - 1, j, k, cc)
  & i >= 1\\
\end{cases}
$$

$$
F(i, j, k, aa) =\begin{cases}
True & i = 2 \land j = 0 \land k = 0\\
  F(i - 2, j, k, b) \lor
  F(i - 2, j, k, bb) \lor
  F(i - 2, j, k, c) \lor
  F(i - 2, j, k, cc)
  & i >= 2\\
\end{cases}
$$

$$
F(i, j, k, b) =\begin{cases}
True & i = 0 \land j = 1 \land k = 0\\
  F(i, j - 1, k, a) \lor
  F(i, j - 1, k, aa) \lor
  F(i, j - 1, k, c) \lor
  F(i, j - 1, k, cc)
  & j >= 1\\
\end{cases}
$$

$$
F(i, j, k, bb) =\begin{cases}
True & i = 0 \land j = 2 \land k = 0\\
  F(i - 2, j, k, a) \lor
  F(i - 2, j, k, aa) \lor
  F(i - 2, j, k, c) \lor
  F(i - 2, j, k, cc)
  & j >= 2\\
\end{cases}
$$

$$
F(i, j, k, c) =\begin{cases}
True & i = 0 \land j = 0 \land k = 1\\
  F(i, j, k - 1, a) \lor
  F(i, j, k - 1, aa) \lor
  F(i, j, k - 1, c) \lor
  F(i, j, k - 1, cc)
  & k >= 1\\
\end{cases}
$$

$$
F(i, j, k, cc) =\begin{cases}
True & i = 0 \land j = 0 \land k = 2\\
  F(i, j, k - 2, a) \lor
  F(i, j, k - 2, aa) \lor
  F(i, j, k - 2, c) \lor
  F(i, j, k - 2, cc)
  & k >= 2\\
\end{cases}
$$

Finally, find $Max\{ i + j + k \ |\ f[i][j][k][s] = True\}$

```c++
#include<iostream>
#include<string>

using namespace std;

const int A  = 0;
const int AA = 1;
const int B  = 2;
const int BB = 3;
const int C  = 4;
const int CC = 5;

bool f[101][101][101][6];

class Solution {

  public:

    string longestDiverseString(int a, int b, int c) {


      // Initial f.
      for (int i = 0; i <= a; i++) {
        for (int j = 0; j <= b; j++) {
          for (int k = 0; k <= c; k++) {
            for (int x = 0; x <= 5; x++) {
              f[i][j][k][x] = false;
            }
          }
        }
      }
      
      // DP-process.
      for (int len = 1; len <= (a + b + c); len++) {
        for (int i = 0; i <= a && i <= len; i++) {
          for (int j = 0; j <= b && (i + j) <= len; j++) {
            
            int k = len - i - j;

            if (k <= c) {

              // ..'a'
              f[i][j][k][A] =
                (i == 1 && j == 0 && k == 0) ||
                (i >= 1 && (
                  f[i - 1][j][k][B] ||
                  f[i - 1][j][k][BB] ||
                  f[i - 1][j][k][C] ||
                  f[i - 1][j][k][CC]
                ));

              // ..'aa'
              f[i][j][k][AA] =
                (i == 2 && j == 0 && k == 0) ||
                (i >= 2 && (
                  f[i - 2][j][k][B] ||
                  f[i - 2][j][k][BB] ||
                  f[i - 2][j][k][C] ||
                  f[i - 2][j][k][CC]
                ));

              // ..'b'
              f[i][j][k][B] =
                (i == 0 && j == 1 && k == 0) ||
                (j >= 1 && (
                  f[i][j - 1][k][A] ||
                  f[i][j - 1][k][AA] ||
                  f[i][j - 1][k][C] ||
                  f[i][j - 1][k][CC]
                ));

              // ..'bb'
              f[i][j][k][BB] =
                (i == 0 && j == 2 && k == 0) ||
                (j >= 2 && (
                  f[i][j - 2][k][A] ||
                  f[i][j - 2][k][AA] ||
                  f[i][j - 2][k][C] ||
                  f[i][j - 2][k][CC]
                ));

              // ..'c'
              f[i][j][k][C] =
                (i == 0 && j == 0 && k == 1) ||
                (k >= 1 && (
                  f[i][j][k - 1][A] ||
                  f[i][j][k - 1][AA] ||
                  f[i][j][k - 1][B] ||
                  f[i][j][k - 1][BB]
                ));


              // ..'cc'
              f[i][j][k][CC] =
                (i == 0 && j == 0 && k == 2) ||
                (k >= 2 && (
                  f[i][j][k - 2][A] ||
                  f[i][j][k - 2][AA] ||
                  f[i][j][k - 2][B] ||
                  f[i][j][k - 2][BB]
                ));
            }  
          }
        }
      }

      int p = 0, q = 0, r = 0, s = 0, max_len = 0;

      // Retrive best answer.
      for (int i = 0; i <= a; i++) {
        for (int j = 0; j <= b; j++) {
          for (int k = 0; k <= c; k++) {
            for (int x = 0; x <= 5; x++) {
              if (f[i][j][k][x] && (i + j + k) > max_len) {

                max_len = i + j + k;
                p = i; q = j; r = k; s = x;
              }
            }
          }
        }
      }

      // Retrive answer.
      string ans = "";

      while ((p + q + r) > 0) {

        switch (s) {

          case  A: ans =  "a" + ans; p -= 1; break;
          case AA: ans = "aa" + ans; p -= 2; break;
          case  B: ans =  "b" + ans; q -= 1; break;
          case BB: ans = "bb" + ans; q -= 2; break;
          case  C: ans =  "c" + ans; r -= 1; break;
          case CC: ans = "cc" + ans; r -= 2; break;
        }

        if ((p + q + r) > 0) {

          for (int x = 0; x <= 5; x++) {

            if (f[p][q][r][x] && ((x >> 1) != (s >> 1))) {

              s = x;

              break;
            }
          }
        }
      }

      return ans;
    }
};
```
