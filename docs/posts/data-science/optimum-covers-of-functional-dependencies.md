# Optimum Covers of Functional Dependencies

## 1. Basic Concepts

### 1.1 Functional dependency

A functional dependency is a relationship between two sets of attributes, represented as below:

$$
  f: X \to Y
$$

which indicates that value(s) of X uniquely determines the value(s) of Y.

### 1.2 Equivalent sets of attributes

For sets of attributes $X$, $Y$ and a set of functional dependencies $F$, if $X \to Y \in F \land Y \to X \in F $,
then we say $X$ and $Y$ are **equivalent** under $F$, written $ X \leftrightarrow Y $.

### 1.3 The sets of functional dependencies

#### 1.3.1 Closure

The **closure** of a given set of functional dependencies $F$ is written $F^+$, which is the set of all
functional dependencies can be inferred from F.

To construct the **closure** of a given $F$, we follow these rules ([Armstrong's axioms](https://en.wikipedia.org/wiki/Armstrong%27s_axioms)):

For $V$, $W$, $X$, $Y$, $Z$, subsets of attributes:

* If $X \to Y \in F$, then $X \to Y \in F^+ $
* $X \to X \in F^+$
* If $X \to YZ \in F^+$, then $X \to Y \in F^+$
* If $X \to YZ \in F^+ \land Z \to VW \in F^+$, then $X \to YZV \in F^+$

#### 1.3.2 Equivalent (Cover)

For sets of functional dependencies $F$ and $G$, if $F^+ = G^+$, then we say $F$ and $G$ are **equivalent**,
written $F = G$, and $F$ is a **cover** of $G$.

#### 1.3.3 Non-redundant

For sets of functional dependencies $G$ and $F$, if $ \not \exist G \subset F, G^+ \neq F^+ $, then we say
$F$ is **non-redundant**.

#### 1.3.4 Canonical

For a set of functional dependencies $F$, if $F$ is **non-redundant** and $\forall X \to Y \in F$, $ |Y| = 1$ and
$\not \exist X^`\subset X, X^` \to Y \in F^+$, then we say $F$ is **canonical**.

#### 1.3.5 Minimum

For a set of functional dependencies $F$, if $\forall G = F, |G| >= |F|$, then we say $F$ is **minimum**.

#### 1.3.6 L-minimum

For a set of functional dependencies $F$, if $F$ is **minimum** and $\forall X \to Y \in F, \not \exist X^` \subset X \land X^` \to Y \in F$,
then we say $F$ is **L-minimum**.

#### 1.3.7 LR-minimum

For a set of functional dependencies $F$, if $F$ is **L-minimum** and $\forall X \to Y \in F, \forall Y^` \subset Y,
(F - \{X \to Y\}) \bigcup \{X \to Y^`\} \neq F$, then we say $F$ is **LR-minimum**.

#### 1.3.8 Optimal

For a set of functional dependencies $F$, if $\not \exist G$, where $G$ has fewer attribute symbols than $F$, then we say
$F$ is **optimal**.


## 2. Lemmas

* 2.1 $ \forall G, F $, if $ G = F $ and $G$, $F$ are non-redundant and $\exist X \to W \in G$, then: $\exist Y \to Z \in F \land X \leftrightarrow Y$

## 3. Algorithms

|  Algorithm | Time Complexity |
|:----------:|:---------------:|
| Membership | $O(n)$          |
| Direct Determination | $O(np)$ |
| Minimum Cover | $O(np)$        |
| L-minimum, LR-minimum | $O(n^2)$ |
| Optical Cover | NP-complete |
| Kernel | $O(n^n)$ |

### 3.1 Membership.

### 3.2 Non-redundant cover.

### 3.3 Decide direct determination.

### 3.4 Minimum Cover

### 3.5 L-minimum and LR-minimum covers

### 3.6 

## References

