# Performance Benchmark

Compare execution speed of different JavaScript functions with repeatable, configurable micro-benchmarks.

## Install

```bash
git clone https://github.com/Masculinn/performance-benchmark.git
cd performance-benchmark
```

## Run

```bash
node server.js
```

## 🧪 Example Output

```
✅ Register valid.

Meta
----------------------------------
Test Name: Speed index check
Test Type: performance test
...

Final Results
----------------------------------
Difference: 0.42(ms)
Winner: auto loop
```

## ⚙️ Config

You can configure via `META.config` in `index.js` or by external config files/CLI.

### 🛠 META Config Structure

```js
const META = {
  config: {
    testType: String,
    testName: String,
    repeat: Number,
    iterations: Bigint | Number,
    interval: Number,
    measurement: "ms" | "sec",
    checkEquality: Boolean,
  },
  first: {
    label: String,
    desc: String,
    func: phase1,
  },
  second: {
    label: String,
    desc: String,
    func: phase2,
  },
};
```

### 🧾 Property Descriptions

| Key             | Type              | Description                                                                 |
| --------------- | ----------------- | --------------------------------------------------------------------------- |
| `testType`      | `string`          | Describes the test category (e.g., `"performance"`).                        |
| `testName`      | `string`          | Human-readable name for the test run.                                       |
| `repeat`        | `number`          | How many total rounds to run for each function.                             |
| `iterations`    | `number`          | Number of function executions per round.                                    |
| `interval`      | `number (ms)`     | Delay between rounds in milliseconds.                                       |
| `measurement`   | `"ms"` or `"sec"` | Whether to measure performance in milliseconds or seconds.                  |
| `checkEquality` | `boolean`         | If `true`, ensures both functions return the same result or fails the test. |

### 🔁 Function Meta (first & second)

| Key     | Type       | Description                               |
| ------- | ---------- | ----------------------------------------- |
| `label` | `string`   | Display name for the function in results. |
| `desc`  | `string`   | Description of the method being tested.   |
| `func`  | `Function` | Actual test function. Should be pure.     |

## ✅ TODOs & Roadmap

- [x] Add `checkEquality` flag
- [ ] Add execution table with per-round diff and winner
- [ ] Export JSON/CSV reports
- [ ] Add CLI interface
- [ ] Support more than two functions

## 📁 Future Directory Structure

```
performance-benchmark/
├── benchmark/
│   ├── index.js
│   └── testModules.js
├── reports/              # [Optional] saved JSON/CSV reports
├── config/               # [Optional] external config files
├── cli.js                # [Optional] CLI entry point
├── package.json
├── README.md
├── .gitignore
├── .prettierrc / .eslintrc
└── LICENSE
```
