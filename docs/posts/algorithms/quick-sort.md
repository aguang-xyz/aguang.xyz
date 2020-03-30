# Quick Sort Algorithm

[Quick Sort](https://en.wikipedia.org/wiki/Quicksort) is a sort algorithm of which the
time complexity is $O(n \times log(n))$.

## Template

```{c++}
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

```
