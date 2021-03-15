# Density-based Spatial Clustering of Applications with Noise.

[Density-based spatial clustering of applications with noise (DBSCAN)](https://en.wikipedia.org/wiki/DBSCAN)
is a clustering algorithm.

## Key Concepts

Let's say $X$ is the sef of all data points, $dist(x, y) \in R$ is a function
to measure the distance between any two data points, $\epsilon \in R^+$ is the
distance limitation and $minPts \in Z^+$ is the density limitation.

  * Given $\epsilon \in R^+$ and $p \in X$, the **$\epsilon$ neighbors** of $p$ is
    $N_{\epsilon}(x) = \{ y \in X \mid dist(x, y) \leq \epsilon \}$.
  * Given $x \in X$, the **density** of $x$ is $\rho(x) = \lvert N_{\epsilon}(x) \rvert $.
  * Given $x, y \in X$, if $y \in N_{\epsilon}(x)$ and $\rho(x) \geq minPts$,
    then we say $y$ is **directly density-reachable** from $x$.
  * Given $x, y \in X$, if there is a sequence $p_1,p_2,\cdots,p_n$, where $x = p_1$,
    $y = p_n$, and every $p_{i + 1}$ is directly density-reachable from $p_i$,
    then we say $y$ is **density-reachable** from $x$.
  * Given $x, y \in X$, if there is a data point $o \in X$, where both $x$ and $y$
    are density-reachable from $o$, then we say $x$ and $y$ are **density-connected**.

The data points $X$ will be divided by DBSCAN into several clusters (containing
**core points** and **density-reachable points**) based on density-connectivity
and **outliers**.

  * Given $\epsilon \in R^+$, $minPts \in Z^+$ and $x \in X$, if
    $\rho(x) \geq minPts$ then we say $x$ is a **core point**.
  * Given $x \in X$, if $x$ is not a core point but is density-reachable from
    any core points, then we say $x$ is a **density-reachable point**.
  * Any other data points in $X$ are **outliers**.

## Pseudo Code

$$
\begin{aligned}

  & DBSCAN(X, minPts, \epsilon) :\\

  & \quad Clusters \leftarrow \empty \\
  & \quad \mathtt{for}\ x \in X: \\
  & \quad \quad \mathtt{if}\ x \not \in \cup_{c \in Clusters} c \land N_{\epsilon}(x) \geq minPts :\\
  & \quad \quad \quad \quad Clusters \leftarrow Clusters \cup Expand(X, x, minPts, \epsilon) \\

  & \quad Outliers \leftarrow X - \cup_{c \in Clusters} c \\
  & \quad \mathtt{return}\ Clusters, Outliers \\
\end{aligned}
$$

$$
\begin{aligned}

  & Expand(X, x, minPts, \epsilon) :\\

  & \quad Cluster \leftarrow \{ x \} \\
  & \quad \mathtt{for}\ y \in N_{\epsilon}(x) :\\
  & \quad \quad \mathtt{if}\ \lvert N_{\epsilon}(y) \rvert \geq minPts:\\
  & \quad \quad \quad Cluster \leftarrow Cluster \cup Expand(X, y, minPts, \epsilon) \\
  & \quad \quad \mathtt{else} :\\
  & \quad \quad \quad Cluster \leftarrow Cluster \cup \{ y \} \\
  & \quad \mathtt{return}\ Cluster
\end{aligned}
$$

## References


* Wikipedia contributors. (2020, April 17). DBSCAN. ***Wikipedia, The Free Encyclopedia***.
  Retrieved from https://en.wikipedia.org/wiki/DBSCAN
