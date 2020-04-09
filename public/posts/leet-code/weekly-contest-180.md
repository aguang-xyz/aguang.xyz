# Leet Code Weekly Contest 180

## 1. [Lucky Numbers in a Matrix](https://leetcode.com/contest/weekly-contest-180/problems/lucky-numbers-in-a-matrix/)

Saddle point of a matrix.

```{c}
int* luckyNumbers (int** matrix, int matrixSize, int* matrixColSize, int* returnSize){

    int *min = (int*) malloc(sizeof(int) * matrixSize);
    int *max = (int*) malloc(sizeof(int) * matrixColSize[0]);

    int i, j, k, *ret;
    
    for (i = 0; i < matrixSize; i++) {
        
        min[i] = matrix[i][0];
        
        for (j = 1; j < matrixColSize[0]; j++) {
            
            if (matrix[i][j] < min[i]) {
                
                min[i] = matrix[i][j];
            }
        }
    }
    
    for (i = 0; i < matrixColSize[0]; i++) {
        
        max[i] = matrix[0][i];
        
        for (j = 0; j < matrixSize; j++) {
            
            if (matrix[j][i] > max[i]) {
                
                max[i] = matrix[j][i];   
            }
        }
    }
    
    for (*returnSize = 0, i = 0; i < matrixSize; i++) {
        
        for (j = 0; j < matrixColSize[0]; j++) {
            
            if (min[i] == matrix[i][j] && max[j] == matrix[i][j]) {
                
                (*returnSize)++;
            }
        }
    }
    
    if (*returnSize == 0) {
        
        ret = NULL;
    } else {
        
        ret = (int*) malloc(sizeof(int) * (*returnSize));
        
        for (i = 0, k = 0; i < matrixSize; i++) {
        
            for (j = 0; j < matrixColSize[0]; j++) {

                if (min[i] == matrix[i][j] && max[j] == matrix[i][j]) {

                    ret[k++] = matrix[i][j];
                }
            }
        }
        
    }
    
    return ret;
}
```

## 2. [Design a Stack With Increment Operation](https://leetcode.com/contest/weekly-contest-180/problems/design-a-stack-with-increment-operation/)

Basic stack implementation.

```{c}
typedef struct {
    
    int *stack;
    
    int size, top;
    
} CustomStack;


CustomStack* customStackCreate(int maxSize) {
    
    
    CustomStack *s = (CustomStack*) malloc(sizeof(CustomStack));
    
    s->stack = (int*) malloc(sizeof(int) * maxSize);
    s->size = maxSize;
    s->top = -1;
    
    return s;
}

void customStackPush(CustomStack* obj, int x) {
  
    if (obj->top < (obj->size - 1)) {
        
        obj->stack[++(obj->top)] = x;
    } 
}

int customStackPop(CustomStack* obj) {
  
    return (obj->top == -1) ? -1 : obj->stack[(obj->top)--];
}

void customStackIncrement(CustomStack* obj, int k, int val) {
  
    int i;
    
    for (i = 0; i < k && i <= obj->top; i++) {
        
        obj->stack[i] += val;
    }
}

void customStackFree(CustomStack* obj) {
    
    free(obj->stack);
    free(obj);
}
```

## 3. [Balance a Binary Search Tree](https://leetcode.com/contest/weekly-contest-180/problems/balance-a-binary-search-tree/)

In-order traversal and then divide-and-conquer.

```{c}
int size_of_tree(struct TreeNode *x) {
    
    return (x == NULL) ? 0 : size_of_tree(x->left) + 1 + size_of_tree(x->right); 
}

void make_sequence(struct TreeNode *x, int *len, int *seq) {
    
    if (x != NULL) {
        
        make_sequence(x->left, len, seq);
        
        seq[(*len)++] = x->val;
        
        make_sequence(x->right, len, seq);
    }
}

struct TreeNode *build_tree(int *seq, int l, int r) {
    
    int mid;
    
    struct TreeNode *x;
    
    if (l <= r) {
        
        mid = (l + r) / 2;
        
        x = (struct TreeNode*) malloc(sizeof(struct TreeNode));
        
        x->left = build_tree(seq, l, mid - 1);
        
        x->val = seq[mid];
        
        x->right = build_tree(seq, mid + 1, r);
        
        return x;
    } else {
        
        return NULL;
    }
}

struct TreeNode* balanceBST(struct TreeNode* root){

    int size = size_of_tree(root);
    
    int *seq = (int*) malloc(sizeof(int) * size), len = 0;
    
    make_sequence(root, &len, seq);
    
    struct TreeNode *ret = build_tree(seq, 0, len - 1);
    
    free(seq);
    
    return ret;
}
```

## 4. [Maximum Performance of a Team](https://leetcode.com/contest/weekly-contest-180/problems/maximum-performance-of-a-team/)

Multi-key sort (efficiency, speed), and then scan all the records by the decreasing-order of efficiency, maintain the sum of max-k sppeds.

```{c++}
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


class Solution {

    struct engineer {

        int speed, efficiency;
    };

    static bool engineer_cmp(engineer &x, engineer &y) {

        return x.efficiency > y.efficiency;
    }

public:
    int maxPerformance(int n, vector<int>& speed, vector<int>& efficiency, int k) {

        auto engineers = leftist_tree<engineer>(engineer_cmp);

        for (int i = 0; i < n; i++) {

            engineer e = engineer();

            e.speed = speed[i];
            e.efficiency = efficiency[i];

            engineers.push(e);
        }

        auto working_speeds = leftist_tree<int>();

        long sum_speed = 0, cnt_working = 0;

        double bestValue = 0;
        int bestAns = 0;

        while (engineers.empty() == false) {

            engineer e = engineers.pop();


            sum_speed += e.speed;
            cnt_working += 1;

            working_speeds.push(e.speed);

            while (cnt_working > k) {

                sum_speed -= working_speeds.pop();

                cnt_working -= 1;
            }

            if (log(sum_speed) + log(e.efficiency) > bestValue) {

                bestValue = log(sum_speed) + log(e.efficiency);

                bestAns = (sum_speed * e.efficiency) % 1000000007;
            }

        }

        return bestAns;
    }
};
```
