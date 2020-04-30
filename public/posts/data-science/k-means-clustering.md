# K-Means Clustering

[K-Means](https://en.wikipedia.org/wiki/K-means_clustering) is a clustering algorithm by which you can cluster data points into 
specific number of groups.

Given data points $X = \{x_1, x_2, \cdots, x_n \}$ where $x_i \in R^m$,
we want to calculate a clustering $\{S_1, S_2, \cdots, S_k\}$ where,

* $\bigcap_{i = 1}^n S_i = \empty$ and $\bigcup_{i = 1}^n S_i = X$.
* WCSS (within-cluster sum of squares) $\sum_{i = 1}^k \sum_{x \in S_i}{\lvert \lvert x - u_i \rvert \rvert}^2$
  is minimum, where $u_i = \frac{1}{\lvert S_i \rvert} \sum_{x \in S_i} x$ is the center of the cluster $S_i$.

## Pseudo Code

$$
\begin{aligned}

  & \text{K-Means}(X, K) :\\

  & \quad U = \{u_1, u_2, \cdots, u_k \} \leftarrow \{ x_1, x_2, \cdots, x_k \} \\

  & \quad \mathtt{do} : \\
  & \quad \quad U^{'} \leftarrow U \\
  & \quad \quad \{c_1, c_2, \cdots, c_n \} \leftarrow \{ 1, 1, \cdots, 1 \} \\
  & \quad \quad \mathtt{for}\ u_i \in U, x_j \in X : \\
  & \quad \quad \quad \mathtt{if}\ \lvert \lvert u_i - x_j \rvert \rvert < \lvert \lvert u_{c_j} - x_j \rvert \rvert : \\
  & \quad \quad \quad \quad c_j \leftarrow i \\
  & \quad \quad \mathtt{for}\ u_i \in U : \\
  & \quad \quad \quad S_i \leftarrow \{ x_j \mid c_j = i \} \\
  & \quad \quad \quad u_i \leftarrow \frac{1}{S_i} \sum_{x_j \in S_i} x_j \\
  & \quad \mathtt{util}\ \lvert \lvert U^{'} - U \rvert \rvert < \sigma \\
\end{aligned}
$$

## References

* Wikipedia contributors. (2020, April 27). K-means clustering. ***Wikipedia, The Free Encyclopedia***. Retrieved
from https://en.wikipedia.org/wiki/K-means_clustering

