# Formal Description of Graph Data

## 1. Graph Data Models

### 1.1 PGM - Property Graph Model

Property graph model is a kind of formal definition of graph data. In this
model, data is reprensented as a directed, attributed multi-graph.

Let's say:

* $\mathcal{O}$ is a set of objects.
* $\mathcal{K}$ is a set of property keys.
* $\mathcal{L}$ is a set of labels.
* $\mathcal{N}$ is a set of values.

Then a property graph is a structure $(V, E, \eta, \lambda, \mu)$ where

* $V \subseteq \mathcal{O}$ is a set of objects, called vertices.
* $E \subseteq \mathcal{O}$ is a set of edges, called edges.
* $\eta : E \to V \times V$ is a function assigning each edge to an ordered
pair of vertices.
* $\lambda : V \cup E \to \mathcal{P}(\mathcal{L})$ is a function assigning each object to a set
of labels.
* $\mu : (V \cup E) \times \mathcal{K} \to \mathcal{N})$ is a function assigning each object and
key to a value.

#### Example.

Here is an example property graph of three people and their relations:

```dot
digraph {

  1[label = "1 : Emily : Kiwi\noccupation = teacher\nage = 35" shape=rect]
  2[label = "2 : Grey\noccupation = student\nage = 24" shape=rect]
  3[label = "3 : Bob \noccupation = self-employed" shape=rect]

  1 -> 2[label = "4 : teaches\nsubject = english"]
  2 -> 3[label = "5 : knows\nsince = 2019"]

  3 -> 3[label = "6 : worksFor\nsince = 2018"]
}
```

For this example:

* $V = \{1, 2, 3\}$
* $E = \{4, 5, 6\}$
* $\eta = E \to V \times V$ is:

  | object | vertices |
  |:------:|:--------:|
  | 4 | 1, 2 |
  | 5 | 2, 3 |
  | 6 | 3, 3 |

* $\lambda = V \cup E \to P(\mathcal{L})$ is:

  | object | labels |
  |:------:|:------:|
  | 1      | Emily, Kiwi |
  | 2      | Grey |
  | 3      | Bog |
  | 4      | teaches |
  | 5      | knows |
  | 6      | worksFor |

* $\mu = (V \cup E) \times \mathcal{K} \to \mathcal{N}$ is:

  | object | key | value |
  |:------:|:---:|:-----:|
  | 1 | occupation | teacher |
  | 1 | age | 35 |
  | 2 | occupation | student |
  | 2 | age | 25 |
  | 3 | occupation | self-employed |
  | 4 | subject | English |
  | 5 | since | 2019 |
  | 6 | since | 2018 |

### 1.2 OPPGM - Objectified Paths Property Graph Model

Based on PGM, if we turn paths into objects, we get objectified
paths property graph model (OPPGM).

An OPPGM is a structure $(V, E, P, \eta, \delta, \lambda, \mu)$ where

* $V \subseteq \mathcal{O}$ is a set of objects, called vertices.
* $E \subseteq \mathcal{O}$ is a set of objects, called edges.
* $P \subseteq \mathcal{O}$ is a set of objects, called paths.
* $\eta : E \to V \times V$ is a function assigning each edge to a pair of
  vertices.
* $\delta : P \to \cup_{n >= 0} E^n$ is a function assgining each path to a
  sequence of edges.
* $\lambda : V \cup E \cup P \to \mathcal{P}(\mathcal{L})$ is a function assigning each object to
  a set of labels.
* $\mu : (V \cup E \cup P) \times \mathcal{K} \to \mathcal{N}$ is a function assigning each object
  and key to a value.

### 1.3 OSPGM - Objectified Subgraph PGM

Based on PGM, if we turn subgraphs into objects, we get objectified subgraph
PGM (OSPGM).

An OSPGM is a structure $(V, E, G, \eta, \gamma, \lambda, \mu)$ where

* $V \subseteq \mathcal{O}$ is a set of objects, called vertices.
* $E \subseteq \mathcal{O}$ is a set of objects, called edges.
* $G \subseteq \mathcal{O}$ is a set of objects, called subgraphs.
* $\eta : E \to V \times V$ is a function assigning each edge to a pair of
  vertices.
* $\gamma : G \to \mathcal{P}(V) \times \mathcal{P}(E)$ is a function assigning every subgraph to
  a pair of vetex set and edge set.
* $\lambda : V \cup E \cup G \to \mathcal{P}(\mathcal{L})$ is a function assigning each object to
  a set of labels.
* $\mu : (V \cup E \cup G) \times \mathcal{K} \to \mathcal{N}$ is a function assigning each object
  and key to a value.

### 1.4 HVPGM - Hypervetex PGM

Based on PGM, if we turn subgraphs into vertices, we get hypervetex PGM (HVPGM).

An HVPGM is a structure $(V, E, \eta, \gamma, \lambda, \mu)$ where

* $V \subseteq \mathcal{O}$ is a set of objects, called vertices.
* $E \subseteq \mathcal{O}$ is a set of objects, called edges.
* $\eta : E \to V \times V$ is a function assigning each edge to a pair of
  vertices.
* $\gamma : V \to \mathcal{P}(V) \times \mathcal{P}(E)$ is a function assigning every subgraph to
  a pair of vetex set and edge set.
* $\lambda : V \cup E \to \mathcal{P}(\mathcal{L})$ is a function assigning each object to
  a set of labels.
* $\mu : (V \cup E) \times \mathcal{K} \to \mathcal{N}$ is a function assigning each object
  and key to a value.

### 1.5 HEPGM - Hyper Edge Property Graph Model

Based on HVPGM, if a edge can link to any non-empty sequence of vertices without
repetitions (not only 2 vertices), we get hyper edge property graph model
(HEPGM).

Ans HEPGM is a structure $(V, E, \eta, \gamma, \lambda, \mu)$ where

* $V \subseteq \mathcal{O}$ is a set of objects, called vertices.
* $E \subseteq \mathcal{O}$ is a set of objects, called edges.
* $\eta : E \to \cup_{X \in \mathcal{P}(V) - \empty} {[\pi(1),...,\pi(|X|)]}$ is a
function assigning each edge to a non-empty sequence of vertices without
repetitions.
* $\gamma : V \to \mathcal{P}(V) \times \mathcal{P}(E)$ is a function assigning every subgraph to
  a pair of vetex set and edge set.
* $\lambda : V \cup E \to \mathcal{P}(\mathcal{L})$ is a function assigning each object to
  a set of labels.
* $\mu : (V \cup E) \times \mathcal{K} \to \mathcal{N}$ is a function assigning each object
  and key to a value.

## 2. Graph Data Queries

### 2.1 Regular Path Queries

For any property graph $G = (V, E, \eta, \lambda, \mu)$, the regular path
queries (PRQ) over $G$ are recursively generated as follows:

  * $\forall a \in \mathcal{L}, a \in \text{PRQ}$
  * $\forall e \in \text{PRQ}, (e)^- \in \text{PRQ}$
  * $\forall e \in \text{PRQ}, (e)^+ \in \text{PRQ}$
  * $\forall e, f \in \text{PRQ}, (e) / (f) \in \text{PRQ}$
  * $\forall e, f \in \text{PRQ}, (e) + (f) \in \text{PRQ}$

Let's say $[[g]]_G \subseteq V \times V$ is the result of query
$g \in \text{PRQ}$, then:

  * $\forall g = a \in \mathcal{L}, [[g]]_G = \{(s, t) \mid \exist e \in E,
    \eta(e) = (s, t) \land a \in \lambda(e)\}$
  * $\forall g = (e)^- \in \text{PRQ}, [[g]]_G = \{(t, s) \mid (s, t) \in
    [[e]]_G\}$
  * $\forall g = (e)^+ \in \text{PRQ}, [[g]]_G = \text{transitive closure for relation}
    [[e]]_G$
  * $\forall g = (e) / (f) \in \text{PRQ}, [[g]]_G = \{(s, t) \mid \exist \mu \in
    V, (s, u) \in [[e]]_G \land (u, t) \in [[f]]_G\}$
  * $\forall g = (e) + (f) \in \text{PRQ}, [[g]]_G = [[e]]_G \cup [[f]]_G$

    
