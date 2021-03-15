# Collaborative Filtering and Matrix Factorization

For many online services (including E-commerce, online news and social media applications), the secret of recommendation system is in modelling users' preference on items based on their past interactions (such as: ratings, clicks, purchases, likes, ...). It is as known as [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering).

## Interaction Matrix.

The matrix shown below is a sample of user-item matrix (or called interaction matrix).

![](/images/data-science/collaborative-filtering-and-matrix-factorization/user-item-matrix.png)

Let's say we have $M$ users and $N$ items (products). $Y \in \mathbb{R}^{M \times N}$ is an interaction matrix from users' implicit data where,

$$
y_{u, i} =
  \begin{cases}
    1 & \text{if interaction between } \text{user}_{u} \text{ and } \text{item}_{i} \text{ is observed} ;\\
    0 & \text{otherwise.}
  \end{cases}
$$


And the problem of [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering) is to estimate the unobserved entries (zero values) in the matrix $Y$.

## [Matrix Factorization](https://developers.google.com/machine-learning/recommendation/collaborative/matrix).

[Matrix Factorization](https://developers.google.com/machine-learning/recommendation/collaborative/matrix) is one of the most popular algorithms to solve [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering). Given a parameter $K$, [Matrix Factorization](https://developers.google.com/machine-learning/recommendation/collaborative/matrix) converts the matrix $Y$ to a pair of matrices $W$ and $H$ where,

* $W \in \mathbb{R}^{M \times K}$.
* $H \in \mathbb{R}^{K \times N}$.
* $W \times H \approx Y$.

Here, $K$ is a small positive integer (compared to M or N). And $W \times H$ approximates the matrix $Y$. Since we reduced many dimensions ($K$ is much smaller than $M$ and $N$), many original information are lost now. The original zero-values become not zeros, and it can be seen as some kind of estimated values showing the hidden trend from the original matrix.

## Implement Recommendation using SK-Learn.

For the rest of this article, I'll show an example using [scikit-learn](https://scikit-learn.org/stable/) to create recommendation result from a movie rating dataset. The data is from [Kaggle's The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset).

Basically, there are three columns in the given dataset:

* `userId`: integer starting from $1$.
* `movieId`: integer starting from $1$.
* `rating`: float number, from $0.5$ to $5$.

First, we load the dataset as a [pandas](https://pandas.pydata.org/) data frame.

```python
import pandas as pd

# Load rating dataset.
ratings = pd.read_csv('./data/ratings_small.csv')
```

And we convert the data frame into a [sparse matrix](https://docs.scipy.org/doc/scipy/reference/sparse.html).

```python
from scipy.sparse import coo_matrix

# Create interaction matrix.
def make_interaction_matrix(ratings):
    
    # Retrieve row indexes (userId starting from 1).
    rows = (ratings['userId'] - 1).values
    
    # Retrieve column indexes (movieId starting from 1).
    cols = (ratings['movieId'] - 1).values
    
    # Retrieve implicit values.
    vals = ratings['rating'].values

    return coo_matrix((vals, (rows, cols)), shape=(max(rows) + 1, max(cols) + 1))

# Interaction matrix.
Y = make_interaction_matrix(ratings)
```

Then we use Scikit-Learn's [Non-negative Matrix Factorization](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.NMF.html) implementation to
decompose the interaction matrix. Here we choose the vector size to be $10$.

```python
from sklearn.decomposition import NMF

# Create matrix factorization model. 
model = NMF(n_components=10)

# Fit the data and retrieve the left matrix W.
W = coo_matrix(model.fit_transform(Y))

# Retrieve the right matrix H.
H = coo_matrix(model.components_)
```

After that, we use $W \times H$ to compute the prediction matrix $P$ and extract all the predicted ratings above $2.5$ where it does not exist in observed data.

```python
# Compute the predition matrix.
P = W * H

# Find non-zero ratings in the prediction.
(I, J, V) = find(P >= 2.5)

# Filter predictions where it does not exist in the implicit data.
new_idxes = list(filter(lambda i : ((ratings['userId'] == I[i] + 1) &
                                   (ratings['movieId'] == J[i] + 1)).sum() == 0,
                       range(len(I))))

# Recommandation ratings.
rec_ratings = pd.DataFrame({
    'userId': I[new_idxes] + 1,
    'movieId': J[new_idxes] + 1,
    'rating': list(map(lambda i : P[I[i], J[i]], new_idxes)),
})
```

Finally, we can use the result `rec_ratings` as the recommendation for users. Show the top-x results for each user or show all the result for each user ordered by rating.

## References.

* [Collaborative filtering](https://en.wikipedia.org/wiki/Collaborative_filtering).
* [Matrix Factorization, Google Developers](https://developers.google.com/machine-learning/recommendation/collaborative/matrix).
* [Scikit-Learn, Machine Learning in Python](https://scikit-learn.org/stable/).
* [The Movies Dataset, Kaggle](https://www.kaggle.com/rounakbanik/the-movies-dataset).
* [Pandas project](https://pandas.pydata.org/).
* [Sparse matrices, Sci-Py](https://docs.scipy.org/doc/scipy/reference/sparse.html).
* [Non-negative matrix factorization, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.NMF.html).
