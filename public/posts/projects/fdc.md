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

### 1.2 Functional dependencies & sets of functional dependencies

A functional dependency is a relationship between two sets of attributes, represented as below:

$$
  f: X \to Y
$$

which indicates that value(s) of X uniquely determines the value(s) of Y.

In FDC, we use [`fdc::fd`](https://aguang-xyz.github.io/fdc/namespacefdc.html#aa9a82a6ea5967445729ae71e5e8065a2)
to represent a functional dependency and [`fdc::fds`](https://aguang-xyz.github.io/fdc/namespacefdc.html#a7bcb6044ef326f8b3fcefe603dd18fbb)
to represent a set of functional dependencies.

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

### 1.4 Equivalent sets of attributes

For sets of attributes $X$, $Y$ and a set of functional dependencies $F$, if $X \to Y \in F^+ \land Y \to X \in F^+ $,
then we say $X$ and $Y$ are **equivalent** under $F$, written $ X \leftrightarrow Y $.

In FDC, [`fdc::equal(attrs, attrs, fds)`](https://aguang-xyz.github.io/fdc/group__algorithms.html#ga8eb059ca0fc991071faed60edade40f9)
is related to this.

### 1.5 Equivalent sets of functional dependencies (cover)

For sets of functional dependencies $F$ and $G$, if $F^+ = G^+$, then we say $F$ and $G$ are **equivalent**,
written $F = G$, and $F$ is a **cover** of $G$.

In FDC, you can use [`fdc::equal(fds, fds)`](https://aguang-xyz.github.io/fdc/group__algorithms.html#gafd2792679098c7b549c7f898bca33a50).

## 2. Different kinds of Functional Dependencies.

### 2.1 Non-redundant

Given a set of functional dependencies $F$, if $ \forall G \subset F, G^+ \neq F^+ $, then we say
$F$ is **non-redundant**.

#### Example

  * $\{ X \to Y, Y \to Z, X \to Z \}$ is **redundant**.
  * $\{ X \to Y, Y \to Z  \}$ is **non-redundant**.

### 2.2 Canonical

Given a set of functional dependencies $F$, if $F$ is **non-redundant** and

$ \forall f: X \to Y \in F $:

  * $ |Y| = 1$
  * $\forall X^`\subset X, X^` \to Y \not \in F^+$
  
then we say $F$ is **canonical**.

#### Example

  * $ \{ XYZ \to V, X \to Y \} $ is **not canonical**.
  * $ \{ XZ \to V, X \to Y \} $ is **canonical**.

### 2.3 Minimum

Given a set of functional dependencies $F$, if $\forall G^+ = F^+, |G| >= |F|$, then we say $F$ is **minimum**.

#### Example

  * $ \{ X \to Y, X \to Z \} $ is **not minimum**.
  * $ \{ X \to YZ \} $ is **minimum**.

### 2.4 L-Minimum

Given a set of functional dependencies $F$, if $F$ is **minimum** and for every $X \to Y \in F$:

  * $\forall X^`\subset X, X^` \to Y \not \in F^+$

then we say $F$ is **L-minimum**.

#### Example

  * $ \{ XYZ \to V, X \to Y \} $ is **not L-minimum**.
  * $ \{ XZ \to V, X \to Y \} $ is **L-minimum**.

### 2.5 LR-minimum

Given a set of functional dependencies $F$, if $F$ is **L-minimum** and for every $ X \to Y \in F $:

  * $\forall Y^` \subset Y, ((F - \{X \to Y\}) \bigcup \{X \to Y^`\})^+ \neq F^+$
  
then we say $F$ is **LR-minimum**.

#### Example

  * $ \{ A \to AB \} $ is **not LR-minimum**.
  * $ \{ A \to B \} $ is **LR-minimum**.

### 2.6 Optimal

Given a set of functional dependencies $F$, if $\forall G$, $G$ has more or
equal attribute symbols than $F$, then we say $F$ is **optimal**.

## 3. Algorithms

## References

* Armstrong, W. W. (1974, August). Dependency Structures of Data Base Relationships. In IFIP congress (Vol. 74, pp. 580-583).
* Beeri, C., & Bernstein, P. A. (1979). Computational problems related to the design of normal form relational schemas. ACM Transactions on Database Systems (TODS), 4(1), 30-59.
* Maier, D. (1979, April). Minimum covers in the relational database model(Extended Abstract). In Annual ACM Symposium on Theory of Computing: Proceedings of the eleventh annual ACM symposium on Theory of computing: Atlanta, Georgia, United States (Vol. 30).


