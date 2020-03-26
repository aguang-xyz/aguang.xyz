# KMP

[KMP](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) is a string-searching algorithm.
For given searching string $s$ and pattern string $p$, it pre-caculates a partial match table of $s$. Through this
partial match table, it can find the matching positions in $O(|s| + |p|)$ time.

## Template

```{c}
#include<string>
#include<vector>

using namespace std;

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

    static vector<int> all_of(string s, string p) {

      vector<int> pmt = pmt_of(p), indexes = {};

      int i = 0, j = 0;

      while (i < s.length() && j < (int) p.length()) {

        if (j == -1 || s[i] == p[j]) {

          ++i, ++j;

          if (j == (int) p.length()) {

            indexes.push_back(i - j);

            i = i - j, j = -1;
          }
        } else {

          j = pmt[j];
        }
      }

      return indexes;
    }
};
```
