# Leet Code Weekly Contest 177

## 1. Number of Days Between Two Dates

To save time, I use javascript for this problem.

```javascript
var daysBetweenDates = function(date1, date2) {

  return Math.abs(Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000));
};
```

## 2. Validate Binary Tree Nodes

DFS, no need to talk.

```c++
class Solution {
public:

    bool visit[10001], root[10001];

    int cnt = 0;

    bool dfs(int x, vector<int> &lc, vector<int> &rc) {

        if (visit[x]) {

            return false;
        }

        visit[x] = true;
        ++cnt;

        if (lc[x] != -1 && !dfs(lc[x], lc, rc)) {

            return false;
        }

        if (rc[x] != -1 && !dfs(rc[x], lc, rc)) {

            return false;
        }

        return true;
    }

    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {

        for (int i = 0; i < n; i++) {

            visit[i] = false;
            root[i] = true;
        }

        for (int i = 0; i < n; i++) {

            if (leftChild[i] != -1) {

                root[leftChild[i]] = false;
            }

            if (rightChild[i] != -1) {

                root[rightChild[i]] = false;
            }
        }

        for (int i = 0; i < n; i++) {
            if (root[i]) {

                if (dfs(i, leftChild, rightChild) == false) {

                    return false;
                }

                return cnt == n;
            }
        }

        return false;
    }
};
```

## 3. Closest Divisors

For any given integer $n$, there must be a factor between $[1, \sqrt{n}]$.

```c++
class Solution {
public:

    vector<int> closestDivisors(int num) {

        int x, y, d = -1;

        for (int i = sqrt(num + 1); i >= 1; i--) {

            if ((num + 1) % i == 0) {
                int j = (num + 1) / i;

                if (d == -1 || (j - i) < d) {

                    d = j - i;
                    x = i;
                    y = j;
                }
            }
        }

        for (int i = sqrt(num + 2); i >= 1; i--) {

            if ((num + 2) % i == 0) {
                int j = (num + 2) / i;

                if (d == -1 || (j - i) < d) {

                    d = j - i;
                    x = i;
                    y = j;
                }
            }
        }

        vector<int> ret;

        ret.push_back(x);
        ret.push_back(y);

        return ret;
    }
};
```

## 4. Largest Multiple of Three

For any given integer $n$, $n \mod 3 = 0$ if and only if the sum of all digits
$s \mod 3 = 0$.

For example: $n = abcd$,

$$
\begin{aligned}
  n \mod 3 &= (1000 \times a + 100 \times b + 10 \times c + d) \mod 3 \\
           &= ((999 \times a + 99 \times b + 9 \times c) + (a + b + c + d)) \mod 3 \\
           &= (a + b + c + d) \mod 3
\end{aligned}
$$

Let's say $s$ is the sum of all digits.

  * If $s \mod 3 = 0$, just sort all digits in descending order.
  * If $s \mod 3 = 1$, remove one digit of $1$, $4$, $7$ or two digits of $2$,
    $5$, $8$ and then sort.
  * If $s \mod 3 = 2$, remove one digit of $2$, $5$, $8$ or two digits of $1$,
    $4$, $7$ and then sort.

```c++
class Solution {
public:

    int cnt[10];

    bool rm1() {

        if (cnt[1] > 0) cnt[1]--;
        else if (cnt[4] > 0) cnt[4]--;
        else if (cnt[7] > 0) cnt[7]--;
        else return false;

        return true;
    }

    bool rm2() {

        if (cnt[2] > 0) cnt[2]--;
        else if (cnt[5] > 0) cnt[5]--;
        else if (cnt[8] > 0) cnt[8]--;
        else return false;

        return true;
    }

    string largestMultipleOfThree(vector<int>& digits) {

        int s = 0;

        for (int i = 0; i < 10; i++)
            cnt[i] = 0;

        for (int i = 0; i < digits.size(); i++) {

            s += digits[i];

            cnt[digits[i]]++;
        }

        switch (s % 3) {

            case 0:
                break;
            
            case 1:
                if (!rm1()) {

                    rm2(); rm2();
                }

                break;

            case 2:
                if (!rm2()) {

                    rm1(); rm1();
                }
        }

        string ret = "";

        for (int i = 9; i >= 0; i--) {

            if (i == 0 && ret.length() == 0 && cnt[0] > 0) return "0";

            while (cnt[i]-- > 0)
                ret += ('0' + i);
        }

        return ret;
    }
};
```

