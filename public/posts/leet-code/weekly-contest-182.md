# Leet Code Weekly Contest 182

## 1. [Find Lucky Integer in an Array](https://leetcode.com/contest/weekly-contest-182/problems/find-lucky-integer-in-an-array/)

$O(n)$, just show the code.

```c++
class Solution {
public:
    int findLucky(vector<int>& arr) {
        
        int f[501];
        
        for (int i = 1; i <= 500; i++) {
            
            f[i] = 0;
        }
        
        for (int i = 0; i < arr.size(); i++) {
            
            f[arr[i]]++;
        }
        
        int ans = -1;
        
        for (int i = 1; i <= 500; i++) {
            
            if (f[i] == i && i > ans) {
                
                ans = i;
            }
        }
        
        return ans;
    }
};
```

## 2. [Count Number of Teams](https://leetcode.com/contest/weekly-contest-182/problems/count-number-of-teams/)

$O(n^3)$, simple.

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        
        int ans = 0, len = rating.size();
        
        for (int i = 0; i < len; i++) {
            
            for (int j = i + 1; j < len; j++) {
                
                for (int k = j + 1; k < len; k++) {
                    
                    if ( (rating[i] < rating[j] && rating[j] < rating[k]) || (rating[i] > rating[j] && rating[j] > rating[k]) ) {
                        
                        ans++;
                    }
                }
            }
        }
        
        return ans;
    }
};
```

## 3. [Design Underground System](https://leetcode.com/contest/weekly-contest-182/problems/design-underground-system/)

$O(n)$, any kind of map or hash-table works for this problem.

```c++
class UndergroundSystem {
public:
    struct check_in_record {
        
        string stationName;
        
        long t;
    };
    
    map<int, check_in_record*> status;
        
    map<string, long> count;
    map<string, long> total;
    
    UndergroundSystem() {
        
        status = map<int, check_in_record*>();
        
        count = map<string, long>();
        total = map<string, long>();
    }
    
    void checkIn(int id, string stationName, int t) {
        
        
        status[id] = new check_in_record();
        status[id]->stationName = stationName;
        status[id]->t = t;
    }
    
    void checkOut(int id, string stationName, int t) {
        
        auto record = status[id];
        
        string key = record->stationName + "," + stationName;
        
        count[key]++;
        total[key] += (t - record->t);
    }
    
    double getAverageTime(string startStation, string endStation) {
        
        string key = startStation + "," + endStation;
        
        return 1.0 * total[key] / count[key];
    }
};
```

## 4. [Find All Good Strings](https://leetcode.com/contest/weekly-contest-182/problems/find-all-good-strings/)

[DP](https://en.wikipedia.org/wiki/Dynamic_programming) & [AC](https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm).

Upload code later.

