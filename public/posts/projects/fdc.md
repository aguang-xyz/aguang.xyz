# FDC - Functional Dependencies' Covers

** HINT: This is a draft. **

[FDC](https://github.com/aguang-xyz/fdc) is a cross-platform c++ library for
calculating the covers of functional dependencies.

* Status: Developing
* [API Doc](https://aguang-xyz.github.io/fdc/namespacefdc.html)

## 1. Basic Concepts

### 1.1 Attributes & sets of attributes.

An attribute is a symbol of a single column in relational database model.
In FDC, we use [`fdc::attr`](https://aguang-xyz.github.io/fdc/namespacefdc.html#a41bc7ebcf5eaef1709d04114c648f60b)
to represent an single attribute, [`fdc::attrs`](https://aguang-xyz.github.io/fdc/namespacefdc.html#ad130047c2c2e671fd58dd6c069dcdde5)
to represent a set of attributes.

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {
  
  auto x = attr("X");
  auto X = attrs({ attr("X"), attr("Y") });

  cout<<"x = "<<to_str(x)<<endl;
  cout<<"X = "<<to_str(X)<<endl;

  return 0;
}
```

### 1.2 Functional dependencies & sets of functional dependencies

A functional dependency is a relationship between two sets of attributes, represented as below:

$$
  f: X \to Y
$$

which indicates that value(s) of X uniquely determines the value(s) of Y.

In FDC, we use [`fdc::fd`](https://aguang-xyz.github.io/fdc/namespacefdc.html#aa9a82a6ea5967445729ae71e5e8065a2)
to represent a functional dependency and [`fdc::fds`](https://aguang-xyz.github.io/fdc/namespacefdc.html#a7bcb6044ef326f8b3fcefe603dd18fbb)
to represent a set of functional dependencies.

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {
 
  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });

  auto f = fd(X, Y);
  auto F = fds({ f });
  
  cout<<"f = "<<to_str(f)<<endl;
  cout<<"F = "<<to_str(F)<<endl;

  return 0;
}
```

### 1.3 Closure

The **closure** of a given set of functional dependencies $F$ is written $F^+$,
which is the set of all functional dependencies can be inferred from F.

Let's say $U$ is the universal set of attributes of $F$.


The **closure** of a given $F$ can be constructred followed by these rules
([Armstrong's axioms](https://en.wikipedia.org/wiki/Armstrong%27s_axioms)):

For any $X, Y, Z \subseteq U$:

  * Rule 1: (Reflexivity). If $$XY \to X \in F^+$.
  * Rule 2: (Augmentation). If $X \to Y \in F^+$, then $XZ \to YZ \in F^+$.
  * Rule 3: (Pseudotranstivity). If $X \to Y \in F^+$ and $Y \to Z \in F^+$, then $X \to Z \in F^+$.

These three rules above are complete to construct the closure of a given $F$.
Additionally, there are two useful rules:

  * Rule 4: (Union). If $X \to Y_1 \in F^+$ and $X \to Y_2 \in F^+$, then
            $X \to Y_1Y_2 \in F^+$.
  * Rule 5: (Decomposition). If $X \to Y$ and $Y^{'} \subset Y$, then
            $X \to Y^{'} \in F^+$.

In FDC, [`fdc::closure_of(fds)`](https://aguang-xyz.github.io/fdc/namespacefdc.html#a96368d32a18a06c946ce13a1175d0af4)
can be used to get the closure of a given fds `F`.

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {

  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });
  auto Z = attrs({ attr("Z") });

  auto F = fds({

    fd(X, Y),
    fd(Y, Z),
    fd(X, Z)
  });

  cout<<to_str(closure_of(F))<<endl;

  return 0;
}
```

### 1.4 Equivalent sets of attributes

For sets of attributes $X$, $Y$ and a set of functional dependencies $F$, if $X \to Y \in F^+ \land Y \to X \in F^+ $,
then we say $X$ and $Y$ are **equivalent** under $F$, written $ X \leftrightarrow Y $.

In FDC, [`fdc::equal(attrs, attrs, fds)`](https://aguang-xyz.github.io/fdc/namespacefdc.html#aa5c43e3577b5ff0d7c7e2d4093d3f451)
is related to this.
 
```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {

  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });
  auto Z = attrs({ attr("Z") });

  auto F = fds({

    fd(X, Y),
    fd(Y, Z),
    fd(Z, X)
  });

  cout<<equal(X, Y, F)<<endl; // Expected to print 1(true).

  return 0;
}
```

### 1.5 Equivalent sets of functional dependencies (cover)

For sets of functional dependencies $F$ and $G$, if $F^+ = G^+$, then we say $F$ and $G$ are **equivalent**,
written $F = G$, and $F$ is a **cover** of $G$.

In FDC, you can use [`fdc::equal(fds, fds)`](https://aguang-xyz.github.io/fdc/namespacefdc.html#aad6df841a7622ac0c1b8d291d91388c3) or
[`fdc::is_cover_of(fds, fds)`](https://aguang-xyz.github.io/fdc/namespacefdc.html#a3023396be854f0792414b149cca563c6).

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {

  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });
  auto Z = attrs({ attr("Z") });

  auto F = fds({

    fd(X, Y),
    fd(Y, Z),
    fd(X, Z)
  });

  auto G = fds({

    fd(X, Y),
    fd(Y, Z),
  });

  cout<<equal(F, G)<<endl;       // Expected to print 1(true).
  cout<<is_cover_of(F, G)<<endl; // Expected to print 1(true).

  return 0;
}
```

### 1.6 Non-redundant

For sets of functional dependencies $G$ and $F$, if $ \forall G \subset F, G^+ \neq F^+ $, then we say
$F$ is **non-redundant**.

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {

  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });
  auto Z = attrs({ attr("Z") });

  auto F = fds({

    fd(X, Y),
    fd(Y, Z),
    fd(X, Z)
  });

  cout<<is_non_redundant(F)<<endl;       // Expected to print 0(false),
                                         // because { X -> Y, Y -> Z } is a
                                         // possible subset of F.

  return 0;
}
```

#### 1.7 Canonical

For a set of functional dependencies $F$, if $F$ is **non-redundant** and $\forall X \to Y \in F$, $ |Y| = 1$ and
$\forall X^`\subset X, X^` \to Y \not \in F^+$, then we say $F$ is **canonical**.

In FDC, [`is_canonical(fds)`](https://aguang-xyz.github.io/fdc/namespacefdc.html#abc0c8d3b283ad8840551e7b22be70688)
is used to check if a given `F` is cannonical.

```c++
#include <iostream>
#include <fdc>

using namespace std;
using namespace fdc;

int main(int argc, char **argv) {

  auto X = attrs({ attr("X") });
  auto Y = attrs({ attr("Y") });
  auto Z = attrs({ attr("Z") });

  auto XY = attrs({ attr("X"), attr("Y") });

  auto F = fds({

    fd(X, Z),
    fd(XY, Z),
  });

  cout<<is_canonical(F)<<endl;       // Expected to print 0(false),
                                     // because X \subset XY and
                                     // XY \to Z \in F.

  return 0;
}
```

#### 1.8 Minimum

For a set of functional dependencies $F$, if $\forall G = F, |G| >= |F|$, then we say $F$ is **minimum**.

#### 1.8 L-minimum

For a set of functional dependencies $F$, if $F$ is **minimum** and $\forall X \to Y \in F, \not \exist X^` \subset X \land X^` \to Y \in F$,
then we say $F$ is **L-minimum**.

#### 1.9 LR-minimum

For a set of functional dependencies $F$, if $F$ is **L-minimum** and $\forall X \to Y \in F, \forall Y^` \subset Y,
(F - \{X \to Y\}) \bigcup \{X \to Y^`\} \neq F$, then we say $F$ is **LR-minimum**.

#### 1.10 Optimal

For a set of functional dependencies $F$, if $\not \exist G$, where $G$ has fewer attribute symbols than $F$, then we say
$F$ is **optimal**.

## 2. Algorithms

|  Algorithm | Time Complexity |
|:----------:|:---------------:|
| Membership | $O(n)$          |
| Direct Determination | $O(np)$ |
| Minimum Cover | $O(np)$        |
| L-minimum, LR-minimum | $O(n^2)$ |
| Optical Cover | NP-complete |
| Kernel | $O(n^n)$ |

### 2.1 Membership.

### 2.2 Non-redundant cover.

### 2.3 Decide direct determination.

### 2.4 Minimum Cover

### 2.5 L-minimum and LR-minimum covers

### 2.6 

## References

* Armstrong, W. W. (1974, August). Dependency Structures of Data Base Relationships. In IFIP congress (Vol. 74, pp. 580-583).
* Beeri, C., & Bernstein, P. A. (1979). Computational problems related to the design of normal form relational schemas. ACM Transactions on Database Systems (TODS), 4(1), 30-59.
* Maier, D. (1979, April). Minimum covers in the relational database model(Extended Abstract). In Annual ACM Symposium on Theory of Computing: Proceedings of the eleventh annual ACM symposium on Theory of computing: Atlanta, Georgia, United States (Vol. 30).


