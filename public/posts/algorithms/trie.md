# Trie Data Structure

[Trie](https://en.wikipedia.org/wiki/Trie) is a kind of preffix search tree,
by which we can map strings to any data type. For any given string $s$, the
time complexity of seeking is $O(|s|)$.

## Template

```{c++}
#include <string>
#include <cstring>

using namespace std;

template<typename T>
class trie {

  private:

    struct trie_node {

      trie_node *children[256];

      T value;
    };

    T& get(trie_node *t, string key, int idx) {

      if (idx == key.length()) {

        return t->value;
      }

      if (t->children[key.at(idx)] == NULL) {

        t->children[key.at(idx)] = create_node();
      }

      return get(t->children[key.at(idx)], key, idx + 1);
    }

    trie_node *create_node() {

      trie_node *t = new trie_node();

      memset(t->children, 0, sizeof(trie*) * 256);

      t->value = default_val;

      return t;
    }
    
    T default_val;

    trie_node *root;

  public:

    trie(T default_val) {

      this->default_val = default_val;
    
      this->root = create_node();
    }

    T& operator[](const string &key) {

      return get(root, key, 0);
    }
};
```
