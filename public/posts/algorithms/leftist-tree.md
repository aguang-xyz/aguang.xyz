# Leftist Tree Data Structure

[Leftist Tree](https://en.wikipedia.org/wiki/Leftist_tree) is a kind of mergeable heap.

## Template

```{c++}
using namespace std;

template<typename T>
class leftist_tree {

  private:

    struct node {

      node *left, *right;

      int s;

      T value;
    };

    node *merge(node *x, node *y) {

      if (x == NULL) {

        return y;
      }

      if (y == NULL) {

        return x;
      }

      if (less_than(y->value, x->value)) {

        node *t = x;
        x = y;
        y = t;
      }

      x->right = merge(x->right, y);

      if (x->left == NULL) {

        x->left = x->right;
        x->right = NULL;
        x->s = 0;
      } else {

        if (x->left->s < x->right->s) {

          node *t = x->left;
          x->left = x->right;
          x->right = t;
        }

        x->s = x->right->s + 1;
      }

      return x;
    }

    node *create_node(T value) {

      node *x = new node();

      x->left = NULL;
      x->right = NULL;
      x->value = value;

      return x;
    }

    bool (*less_than)(T &x, T &y);

    node *root;

  public:

    static bool small_first(T &x, T &y) {

      return x < y;
    }
    
    static bool big_first(T &x, T &y) {

      return x > y;
    }

    leftist_tree() {

      this->less_than = small_first;
      this->root = NULL;
    }

    leftist_tree(bool (*less_than)(T &x, T &y)) {

      this->less_than = less_than;
      this->root = NULL;
    }

    bool empty() {

      return root == NULL;
    }

    T push(const T &x) {

      root = merge(root, create_node(x));

      return x;
    }

    T pop() {

      node *new_root = merge(root->left, root->right);

      T ret = root->value;

      delete root;

      root = new_root;

      return ret;
    }

    void merge(leftist_tree<T> &x) {

      if (x.root != NULL) {

        if (less_than == x.less_than) {

          root = merge(root, x.root);
          
          x.root = NULL;
        } else {

          while (x.empty() == false) {

            push(x.pop());
          }
        }
      }
    }
};

```
