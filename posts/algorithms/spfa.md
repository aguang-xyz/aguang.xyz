# Shortest Path Faster Algorithm.

Shortest Path Faster Algorithm (SPFA) is an improved version of [Bellman-Ford](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm), which uses a FIFO queue to maintain the relexing vertices. Time complexity: $O(|V| \times |E|)$.

SPFA terminates only if there is no negative circle in the graph. And if we add some additional check (whether some node has been pushed into the queue more than N times) to check if there is a negative circle in the graph.

Comparing with Dijksra, SPFA can work with negative distance but the time complexity of Dijkstra is more stable.

```c++
#include <queue>
#include <vector>

using namespace std;

struct edge {
  int target, dist;
};

int spfa(int s, int t, int n, vector<edge> links[]) {

  int dist[n];
  bool visit[n];

  queue<int> Q;

  for (int i = 0; i < n; i++) {
    dist[i] = __INT_MAX__;
    visit[i] = false;
  }

  dist[s] = 0;
  visit[s] = true;

  Q.push(s);

  while (Q.size() > 0) {

    int src = Q.front();
    Q.pop();

    for (auto edge : links[src]) {
      if (dist[src] + edge.dist < dist[edge.target]) {
        dist[edge.target] = dist[src] + edge.dist;

        if (!visit[edge.target]) {
          Q.push(edge.target);
          visit[edge.target] = true;
        }
      }
    }
  }

  return dist[t];
}
```
