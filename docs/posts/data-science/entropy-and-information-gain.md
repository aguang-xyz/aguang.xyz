# Entropy and Information Gain

## 1. Play golf or not?

To begin with this topic, let's think about a question from the dataset given below.

| Outlook  | Temperature | Humidity | Windy | Play Golf |
|:--------:|:-----------:|:--------:|:-----:|:---------:|
| sunny    | warm        | low      | no    | **yes**   |
| sunny    | hot         | medium   | no    | no        |
| rainy    | warm        | low      | yes   | no        |
| overcast | hot         | high     | no    | no        |
| sunny    | warm        | medium   | yes   | **yes**   |
| rainy    | hot         | medium   | yes   | no        |
| sunny    | warm        | low      | no    | **yes**   |
| overcast | warm        | low      | yes   | **yes**   |
| rainy    | warm        | high     | no    | no        |
| overcast | hot         | medium   | yes   | **yes**   |

From the dataset of people playing golf or not in different conditions, which attribute do you think is most useful to predict wheather people play golf or not?

## 2. What is entropy?

To answer this question, one simple idea could be choosing the attribute of which the distribution is most complicated from the given dataset. 

But, how to quantify the complexity of an attribute?

Here, `entropy` could be useful.

### 2.1 The definition of entropy. 

Entropy is a concept from information theory, which is used to measure the amount of uncertainty in a system.
It measures the average number of bits required to represent the state of a system.

$$ H(X) = -\sum_{x} P(X = x) \log_{2} P(X = x) $$

We define:

$$ 0 \log_{2} 0 = 0 $$

Basically, higher entropy of a system indicates more information that the system has.
Or, in other words, the system is more complicated.

### 2.2 The entropy of `Play`.

There are 5 `yes` instances and 5 `no` instances of attribute `Play` in this dataset.

$$ P(Play = yes) = \frac{5}{10} = \frac{1}{2} $$

$$ P(Play = no) = \frac{5}{10} = \frac{1}{2} $$

The entropy of class attribute `Play` is:

$$ H(Play) = - \frac{1}{2} \log_{2} \frac{1}{2} - \frac{1}{2} \log_{2} \frac{1}{2} = 1 $$

### 2.3 The entropy of `Temperature`.

There are  6 `warm` instances and 4 `hot` instances of attribute `Temperature` in this dataset.

$$ P(Temperature = warm) = \frac{6}{10} = \frac{3}{5} $$

$$ P(Temperature = hot) = \frac{4}{10} = \frac{2}{5} $$

The entropy of attribute `Temperature` is:

$$ H(Temperature) = - \frac{3}{5} \log_{2} \frac{3}{5} - \frac{2}{5} \log_{2} \frac{2}{5} \approx 0.97 $$

### 2.4 The answer through compraing `entropy`.

Similarly, we can caculate the entropies of each attribute:

| Attribute   | Entropy |
|:-----------:|:-------:|
| Outlook     | 1.57    |
| Temperature | 0.97    |
| Humidity    | 1.52    |
| Windy       | 1       |

By considering the entropies of different attributes, `Outlook` could be most useful to predict whether people play golf.

## 3. What is information gain?

So far, you've got some kind of answer for the question given in section 1.

But, as you might already concerned, what we really care is the complexity of relation between specific attribute and class attribute
instead of the compexity of the attribute itself.

Now, you need `information gain`.

### 3.1 The definition of information gain.

Basically, `information gain` measures how much does the relation between `X` and `Y` bring.

$$ IG(Y, X) = H(Y) - H(Y | X) $$

Where `H(Y | X)` is the entropy of Y when the attribute X has been given.

$$ H(Y | X) = \sum_{x} P(X = x) H(Y | X = x) $$

Based on the definition of entropy(section 2.1), we know:

$$ H(Y | X = x) = - \sum_{y} P(Y = y | X = x) \log_{2} P(Y = y | X = x) $$

To avoid zero value of `P(Y = y | X = x)` from given dataset, we should use [additive smoothing](https://en.wikipedia.org/wiki/Additive_smoothing) here:

$$ P(Y = y | X = x) = \frac{|\{i \in D \mid i_X = x \land i_Y = y\}|}{|\{i \in D \mid i_X = x\}|} \approx \frac{|\{i \in D \mid i_X = x \land i_Y = y\}| + 1}{|\{i \in D \mid i_X = x\}| + |Y|} $$

### 3.2 The information gain from `Temperature` to `Play`.

Conditional probabilities:

$$ P(P = yes | T = warm) = \frac{4 + 1}{6 + 2} = \frac{5}{8} $$

$$ P(P = no | T = warm) = \frac{3}{8} $$

$$ P(P = yes | T = hot) = \frac{1 + 1}{4 + 2} = \frac{1}{3} $$

$$ P(P = no | T = hot) = \frac{2}{3} $$

Conditional entropies:

$$ H(P | T = warm) = - P(P = yes | T = warm) \log_{2} P(P = yes | T = warm) - P(P = no | T = warm) \log_{2} P(P = no | T = warm) = - \frac{5}{8} \log_{2} \frac{5}{8} - \frac{3}{8} \log_{2} \frac{3}{8} \approx 0.954 $$

$$ H(P | T = hot) = - P(P = yes | T = hot ) \log_{2} P(P = yes | T = hot) - P(P = no | T = hot) \log_{2} P(P = no | T = hot) = - \frac{1}{3} \log_{2} \frac{1}{3} - \frac{2}{3} \log_{2} \frac{2}{3} \approx 0.918 $$

$$ H(P | T) = P(T = warm) H(P|T = warm) + P(T = hot) H(P | T = hot) \approx \frac{3}{5} \times 0.954 + \frac{2}{5} \times 0.918 \approx 0.94 $$

The information gain between `temperature` to `Play`:

$$ IG(P, T) = H(P) - H(P, T) \approx 1 - 0.94 = 0.06 $$

### 3.3 The answer through comparing `information gain`.

Similarly, we can caculate the information gains for each attribute:

| Attribute | Information Gain |
|:---------:|:----------------:|
| Outlook   | 0.13             |
| Temp      | 0.06             |
| Humidity  | 0.08             |
| Windy     | 0.02             |

By considering the information gains of different attributes, `Outlook` could also be most useful to predict whether people play gold.

## 4. What is Information Gain Ratio?

So far, we know two approaches to meansure the complexity of a specific attribute and the compexity of the relationship between a specific attribute and the class attribute.

Actually, they are the main ideas of how to select the attribute that best classifies examples in the algorithm [ID3](https://en.wikipedia.org/wiki/ID3_algorithm).

Now, let's talk about `information gain ratio`, which has been used in the algorithm [C4.5](https://en.wikipedia.org/wiki/C4.5_algorithm), a successor of [ID3](https://en.wikipedia.org/wiki/ID3_algorithm).

### 4.1 The definition of information gain ratio.

Information gain ratio is the ratio between the information gain and the entropy of given attribute:

$$ GR(Y, X) = \frac{IG(Y, X)}{H(X)} $$

The purpose of information gain ratio is reducing the bias when an attribute has multiple different values.

### References

* Wikipedia contributors. (2020, January 22). Additive smoothing. ***Wikipedia, The Free Encyclopedia***. Retrieved from https://en.wikipedia.org/wiki/Additive_smoothing
* Wikipedia contributors. (2020, February 10). ID3 algorithm. ***Wikipedia, The Free Encyclopedia***. Retrieved from https://en.wikipedia.org/wiki/ID3_algorithm
* Wikipedia contributors. (2020, February 29). C4.5 algorithm. ***Wikipedia, The Free Encyclopedia***. Retrieved from https://en.wikipedia.org/wiki/C4.5_algorithm

