# Adaptive Boosting Algorithm

[Adaptive Boosting (AdaBoost)](https://en.wikipedia.org/wiki/AdaBoost) is an
ensembled machine learning algorithm. The key idea is:

  * Improving the weights of mis-classified instances.
  * Voting by a sort of weak classifiers can lead to a strong classifier.
  * Better weak classifiers should have greater weights to vote.

AdaBoost is sensitive to noisy data and outliers.

### Input

  * Train instances: $T = \{ (x_1, y_1), (x_2, y_2),\cdots,(x_N, y_N) \}$,
    where $N$ is the number of instances, $x_i \in R^n$, $y_i \in \{ -1, +1 \}$,
    $i = 1,2,\cdots,N$, $n$ is the number of features.
  * Weak binary classifiers: $H = \{ h_1, h_2,\cdots,h_M \}$, where $M$ is the number of
    classifiers, $h_i(x) \in \{-1, +1 \}$, $i = 1,2,\cdots,M$.
  * Max iteration times $K$.

### Output

  * A strong  binary classifier $G(x) = sgn(\sum_{i = 1}^{N} a_{i} h_i(x))$,
    where
    
    $$
    sgn(x) = \begin{cases}
      +1 & x \geq 0 \\
      -1 & x \geq 0 \\
    \end{cases}
    $$

    $a_i$ is the weights of weak classifiers.

### Pseudo Code

$$
\begin{aligned}
  & AdaBoost(K, X, Y, H) \\
  & \quad \mathtt{Initialize\ weights\ of\ instances\ } D = \begin{bmatrix}
    d_{1, 1} & d_{1, 2} & \cdots & d_{1, N} \\
    d_{2, 1} & d_{2, 2} & \cdots & d_{2, N} \\
    \vdots   & \vdots   & \ddots & \vdots   \\
    d_{M, 1} & d_{M, 2} & \cdots & d_{M, N} \\
  \end{bmatrix} \leftarrow
  \begin{bmatrix}
    \frac{1}{N} & \frac{1}{N} & \cdots & \frac{1}{N} \\
    \frac{1}{N} & \frac{1}{N} & \cdots & \frac{1}{N} \\
    \vdots      &     \vdots  & \ddots & \frac{1}{N} \\
    \frac{1}{N} & \frac{1}{N} & \cdots & \frac{1}{N} \\

  \end{bmatrix}\\
  & \quad \mathtt{Repeat}\ K\ \mathtt{times} :\\
  & \quad \quad \mathtt{for}\ h_i \in H :\\
  & \quad \quad \quad \mathtt{Train\ } h_i \mathtt{\ using\ } X, Y \mathtt{\ with\ } D\\
  & \quad \quad \quad \mathtt{Error\ rate\ } e_i = \frac{1}{N} \sum_{j = 1}^N P(h_i(x_j) \neq y_j)\\
  & \quad \quad \quad \mathtt{Weights\ of\ classifiers\ } a_i = \frac{1}{2} log \frac{1 - e_i}{e_i}\\

  & \quad \quad \mathtt{Update\ weights\ of\ instances\ }d_{i,j} \leftarrow \begin{cases}
                        d_{i,j} \times e^{-a_i} & h_i(x_j) = y_j \\
                        d_{i,j} \times e^{a_i}  & h_i(x_j) \neq y_j \\
                      \end{cases} \\
  & \quad \quad \mathtt{Normalize\ weights\ of\ instances\ } d_{i,j} \leftarrow \frac{d_{i,j}}{\sum_{j = 1}^{N} d_{i,j}}\\

  & \quad \mathtt{return }\ G(x) = sgn(\sum_{i = 1}^{N} a_{i} h_i(x)) \\
  & 

\end{aligned}
$$

### References

* Wikipedia contributors. (2020, April 6). AdaBoost. ***Wikipedia, The Free Encyclopedia.*** Retrieved
  from https://en.wikipedia.org/wiki/AdaBoost

