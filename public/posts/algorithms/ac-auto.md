# AC-Automaton Multi-Pattern Searching Algorithm

[AC](https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm) is a
multi-pattern searching algorithm. For a given set of pattern strings $S$, it
pre-caculates a trie representing a state-machine for searching process. And
the time complexity is $O(\sum_{s \in S} |s|)$.

Here is an example of AC-automaton structure with 4 patterns (`she`, `shy`,
`say`, `her`):

```dot
digraph {

  node [shape="record"]

  root [style="filled", color="black", fillcolor="chartreuse"];

  
  root -> h[label="h"]
  h -> he[label="e"]
  he -> her[label="r"]
  
  root -> s[label="s"]
  s -> sa[label="a"]
  sa -> say[label="y"]
  
  s -> sh[label="h"]
  sh -> she[label="e"]
  sh -> shy[label="y"]

  h -> root[label="fail", color="red", style="dashed"]
  he -> root[label="fail", color="red", style="dashed"]
  her -> root[label="fail", color="red", style="dashed"]
  s -> root[label="fail", color="red", style="dashed"]
  sa -> root[label="fail", color="red", style="dashed"]
  say -> root[label="fail", color="red", style="dashed"]
  sh -> h[label="fail", color="red", style="dashed"]
  she -> he[label="fail", color="red", style="dashed"]
  shy -> root[label="fail", color="red", style="dashed"]
}
```

## Implementation 

```c++
#include "trie.hpp"

using namespace std;

class ac_auto {

  public:

    struct ac_ext {

      trie<ac_ext>::node *fail;

      string *pattern;
    };

  private:

    trie<ac_ext> dict;

  public:

    auto root() {

      return dict.root();
    }

    // Construct AC-automaton.
    ac_auto(const set<string> &patterns) {

      // 1. Insert all patterns into trie.
      for (const string &pattern : patterns) {

        dict[pattern].ext.pattern = new string(pattern);
      }

      // 2. Resolve root node.
      auto root = &dict[""];

      root->ext.fail = root;

      // 3. Initialize queues for BFS process.
      auto q_chr = queue<char>({ '\0' });
      auto q_ptr = queue<trie<ac_ext>::node*>({ root });

      // 4. BFS-loop.
      while (!q_chr.empty() && !q_ptr.empty()) {

        // 4.1. Pop node `p` suffixed with `c`.
        auto c = q_chr.front();
        auto p = q_ptr.front();

        q_chr.pop();
        q_ptr.pop();
        
        // 4.2. Find fail pointer for node `p`.
        if (p != root) {

          if (p->parent == root) {

            p->ext.fail = root;

          } else {

            auto q = p->parent->ext.fail;
            
            while (q != root && q->children[c] == NULL) {

              q = q->ext.fail;
            }

            p->ext.fail = q->children[c] != NULL ? q->children[c] : root;
          }
        }
        
        // 4.3. Expand all children of p.
        for (const auto &itr : p->children) {

          q_chr.push(itr.first);
          q_ptr.push(itr.second);
        }
      }
    }

    set<pair<int, string>> match(string search) {

      auto ret = set<pair<int, string>>();

      // Current state in ac-automaton.
      auto s = root();

      for (int pos = 0; pos < search.length(); pos++) {

        // `c` is the next character expected to be matched.
        const char c = search[pos];

        // Move to failback-node until character `c` is acceptable or state `s`
        // goes to empty state.
        while (s != root() && NULL == s->children[c]) {

          s = s->ext.fail;
        }

        // Try to accept character `c`.
        if (NULL != s->children[c]) {

          s = s->children[c];
        }

        // Iterate all suffixes of current state `s`, check if there are any
        // matched patterns.
        for (auto q = s; q != root(); q = q->ext.fail) {

          const string *pattern = q->ext.pattern;

          if (NULL != pattern) {

            ret.insert(pair<int, string>(pos - (*pattern).length() + 1,
                                         *pattern));
          }
        }
      }

      return ret;
    }

    trie<ac_ext>::node& operator[](const string &key) {

      return dict[key];
    }
};
```
