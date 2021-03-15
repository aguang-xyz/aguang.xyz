# Leet Code Weekly Contest 178

## 1. [How Many Numbers Are Smaller Than the Current Number](https://leetcode.com/contest/weekly-contest-178/problems/how-many-numbers-are-smaller-than-the-current-number/)

Brute force.

```c++
class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        
        vector<int> result;
        
        for (int i = 0; i < nums.size(); i++) {
            
            int cnt = 0;
            
            for (int j = 0; j < nums.size(); j++) {
                
                if (j != i && nums[j] < nums[i]) {
                    
                    ++cnt;
                }
            }
            
            result.push_back(cnt);
        }
        
        return result;
    }
};
```

## 2. [Rank Teams by Votes](https://leetcode.com/contest/weekly-contest-178/problems/rank-teams-by-votes/)

Multi-field sort.

```c++
#include<vector>

using namespace std;

template<typename T>
class quick_sort {

  public:

    static bool small_first(T &x, T&y) {

      return x < y;
    }
    
    static bool big_first(T &x, T&y) {

      return x > y;
    }

    static vector<T> sort(vector<T> &elements) {

      return sort(elements, small_first);
    }

    static vector<T> sort(vector<T> &elements, bool (*less_than)(T&, T&)) {

      sort(elements, 0, elements.size() - 1, less_than);

      return elements;
    }

  private:

    static void sort(vector<T> &elements, int l, int r, bool (*less_than)(T&, T&)) {

      if (l < r) {

        T mid = elements[l];

        int i = l, j = r;

        while (i < j) {

          while (i < j && less_than(mid, elements[j])) j--;

          if (i < j) {

            elements[i] = elements[j];

            i++;
          }

          while (i < j && less_than(elements[i], mid)) i++;

          if (i < j) {

            elements[j] = elements[i];

            j--;
          }
        }

        elements[i] = mid;

        sort(elements, l, i - 1, less_than);
        sort(elements, i + 1, r, less_than);
      }
    }
};

struct Team {
    
    char name;
    
    int votes[26];
    
    int total_vote;
};

class Solution {
public:
    
    static bool team_compare(Team &x, Team &y) {
    
        for (int i = 0; i < 26; i++) {
            
            if (x.votes[i] > y.votes[i]) {
                
                return true;
            }
            
            if (x.votes[i] < y.votes[i]) {
                
                return false;
            }
        }
        
        return x.name < y.name;
    }
    
    string rankTeams(vector<string>& votes) {
        
        vector<Team> teams;
        
        for (int i = 0; i < 26; i++) {
            
            Team team;
            
            team.name = 'A' + i;
            
            for (int j = 0; j < 26; j++) {
                
                team.votes[j] = 0;
            }
            
            team.total_vote = 0;
            
            teams.push_back(team);
        }
        
        for (string &vote : votes) {
            
            for (int i = 0; i < vote.length(); i++) {
                
                teams[vote[i] - 'A'].votes[i]++;
                
                teams[vote[i] - 'A'].total_vote++;
            }
        }
        
        quick_sort<Team>::sort(teams, team_compare);
        
        string ans = "";
        
        for (Team &team : teams) {
            
            if (team.total_vote > 0) {
                
                ans += team.name;
            }
        }
        
        return ans;
    }
};
```

## 3. [Linked List in Binary Tree](https://leetcode.com/contest/weekly-contest-178/problems/linked-list-in-binary-tree/)

DFS.

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    
    bool isPath1(ListNode* head, TreeNode *root) {
    
        if (head == NULL) {
            
            return true;
        }
        
        if (root == NULL) {
            
            return false;
        }
        
        if (head->val != root->val) {
            
            return false;
        }
        
        return isPath1(head->next, root->left) || isPath1(head->next, root->right);
    }
    
    bool isSubPath(ListNode* head, TreeNode* root) {
       
        if (head == NULL) {
            
            return true;
        }
        
        if (root == NULL) {
            
            return false;
        }
        
        return isPath1(head, root) || isSubPath(head, root->left) || isSubPath(head, root->right);
    }
};
```

## 4. [Minimum Cost to Make at Least One Valid Path in a Grid](https://leetcode.com/contest/weekly-contest-178/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)

DFS And every time expand all not-visited nodes which have at least one neighbor visited.

```c++
class Solution {
public:
    
    int n, m, map[101][101];
    
    int dx[4] = {0, 0, 1, -1};
    int dy[4] = {1, -1, 0, 0};
    
    bool visited[2][100][100];
    
    void dfs(int now, int x, int y) {
        
        visited[now][x][y] = true;
        
        int next_x = x + dx[map[x][y] - 1];
        int next_y = y + dy[map[x][y] - 1];
        
        if (next_x >= 0 && next_x < n && next_y >= 0 && next_y < m) {
            
            if (!visited[now][next_x][next_y]) {
                
                dfs(now, next_x, next_y);
            }
        }
    }
    
    int minCost(vector<vector<int>>& grid) {
        
        n = grid.size();
        m = grid[0].size();
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                
                map[i][j] = grid[i][j];
                
                visited[0][i][j] = false;
                visited[1][i][j] = false;
            }
        }
        

        dfs(0, 0, 0);
        
        int ans = 0;
        
        for (int pre = 0, now = 1; ; now = pre, pre = 1 - pre, ++ans) {
        
            if (visited[pre][n - 1][m - 1]) {
                
                return ans;
            }
            
            for (int x = 0; x < n; x++) {
                for (int y = 0; y < m; y++) {
                    
                    visited[now][x][y] = visited[pre][x][y];
                }
            }
            
            for (int x = 0; x < n; x++) {
                for (int y = 0; y < m; y++) {
                    
                    if (!visited[now][x][y]) {
                        
                        bool able = false;
                        
                        for (int d = 0; d < 4; d++) {
                            
                            int prev_x = x + dx[d];
                            int prev_y = y + dy[d];

                            if (prev_x >= 0 && prev_x < n && prev_y >= 0 && prev_y < m) {
                                if (visited[pre][prev_x][prev_y]) {
                                    
                                    able = true;
                                    
                                    break;
                                }
                            }
                        }  
                        
                        if (able) {
                            
                            dfs(now, x, y);
                        }
                    }
                }
            }
        }
    }
};
```
