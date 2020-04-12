# Fenwick Tree

A [fenwick tree](https://en.wikipedia.org/wiki/Fenwick_tree) or binary indexed
tree is a kind of data structure used to maintain the preffix sums of an
ordered list of numbers.

```dot
digraph {
  newrank = "true"

	node[shape = rect]

	C8 -> C4
	C8 -> C6
	C8 -> C7
	C8 -> A8

	C8[label = "sum[8] = 33"]

	C4 -> C2
	C4 -> C3
	C4 -> A4

	C6 -> C5
	C6 -> A6

	C2 -> C1
	C2 -> A2

	C4[label = "sum[4] = 19"]

	subgraph {

    rank="same"
		
		C2[label = "sum[2] = 9"]
		C6[label = "sum[6] = 7"]
	}

	subgraph {
    
		rank="same"

		C1[label = "sum[1] = 9"]
		C3[label = "sum[3] = 7"]
		C5[label = "sum[5] = 2"]
		C7[label = "sum[7] = 4"]
	}

  subgraph cluster_subs {

    rank="same"
		bgcolor="yellow"

		A1[style=filled fillcolor="white"]
		A2[style=filled fillcolor="white"]
		A3[style=filled fillcolor="white"]
		A4[style=filled fillcolor="white"]
		A5[style=filled fillcolor="white"]
		A6[style=filled fillcolor="white"]
		A7[style=filled fillcolor="white"]
		A8[style=filled fillcolor="white"]

		A1[label = "a[1] = 9"]
		A2[label = "a[2] = 0"]
		A3[label = "a[3] = 7"]
		A4[label = "a[4] = 3"]
		A5[label = "a[5] = 2"]
		A6[label = "a[6] = 5"]
		A7[label = "a[7] = 4"]
		A8[label = "a[8] = 3"]
  }
	
	C1 -> A1
	C3 -> A3
	C5 -> A5
	C7 -> A7
}
```

The main concept of fenwick tree is $Lowbit$ function, which is the number of
which all bits are assgined to zero without the last $1$ in the given number's
binary representation. Each node $Sum_k$ in fenwick tree holds the sum of
$\sum_{i - lowbit(i) + 1}^{k} A_i$

In most programming languages, $lowbit$ can be implemented like this:

```c++
int lowbit(int x) {

  return x & (-x);
}
```
## Implementation

```c++
class bit {

  public:

    int *sum, size;

    bit(int size) {

      this->size = size;
      this->sum = new int[size + 1];

      for (int i = 0; i <= size; i++) {

        this->sum[i] = 0;
      }
    }

    void add(int pos, int value) {

      while (pos <= this->size) {

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

```

