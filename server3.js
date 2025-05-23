import { phase1, phase2 } from "./testModules.js";

/* Test Config */

const META = {
  config: {
    testType: "performance",
    testName: "Speed index check",
    repeat: 5,
    iterations: 1e7,
    interval: 5000,
    measurement: "ms",
    checkEquality: true,
  },
  first: {
    label: "manual loop",
    desc: "array charset manual for loop method",
    func: phase1,
  },
  second: {
    label: "auto loop",
    desc: "string charset using 'split' string method",
    func: phase2,
  },
};

const {
  testType,
  testName,
  repeat,
  iterations,
  interval,
  measurement,
  checkEquality,
} = META.config;

let appResults = [];
let appError = undefined;
let appRepeat = repeat;

/* Begin testing application */

console.log("Test initializing...");
console.log("Checking the registry...");

/* Validate Actions */

(function () {
  try {
    if (typeof META.first.func !== "function") {
      throw new Error(
        'Functions must be a function. \n Fatal error encountered on first meta "func" object property.'
      );
    }
    if (typeof META.second.func !== "function") {
      throw new Error(
        'Functions must be a function. \n Fatal error encountered on second meta "func" object property.'
      );
    }
    if (typeof testType !== "string") {
      throw new Error(
        `Test type must be "string" but instead returned ${JSON.stringify(
          typeof testType
        )}. \n Error encountered on config meta "testType" object property.`
      );
    }
    if (typeof testType === "") {
      throw new Error(
        'You likely forgot to add "testType", returned empty string. \n Error encountered on config meta "testType" object property.'
      );
    }
    if (typeof testName !== "string") {
      throw new Error(
        `Test type must be "string" but instead returned ${JSON.stringify(
          typeof testType
        )}. \n Error encountered on config meta "testName" object property.`
      );
    }
    if (typeof testName === "") {
      throw new Error(
        'You likely forgot to add "testName", returned empty string. \n Error encountered on config meta "testName" object property.'
      );
    }
    if (typeof repeat !== "number" || repeat <= 0) {
      throw new Error(
        `"repeat" property must be a "number" greater than "0" but instead returned ${
          repeat > 0 ? JSON.stringify(typeof repeat) : repeat
        }. \n Fatal error encountered on config meta "repeat" object property.`
      );
    }
    if (typeof iterations !== "number" || iterations <= 0) {
      throw new Error(
        `"iterations" property must be a "number" greater than "0" but instead returned "${
          iterations > 0 ? JSON.stringify(typeof repeat) : repeat
        }". \n Fatal error encountered on config meta "iterations" object property.`
      );
    }
    if (typeof interval !== "number" || interval <= 0) {
      throw new Error(
        `"interval" property must be a "number" greater than "0" but instead returned "${
          interval > 0 ? JSON.stringify(typeof interval) : interval
        }". \n Fatal error encountered on config meta "interval" object property.`
      );
    }
    if (measurement !== "sec" && measurement !== "ms") {
      throw new Error(
        `"measurement" property must be either "sec" or "ms" which stands for "second" and "millisecond" but instead returned ${
          typeof measurement !== "string"
            ? JSON.stringify(typeof measurement)
            : measurement
        }. Fatal error encountered on config meta "measurement" object property`
      );
    }
    if (checkEquality) {
      if (
        JSON.stringify(META.first.func()) !== JSON.stringify(META.second.func())
      )
        throw new Error(
          '"checkEquality" property has been defined as "true" but the functions does not return the same value. Consider setting the "checkEquality" to "false".\n Fatal error encountered on config meta "checkEquality" object property.'
        );
    }
  } catch (err) {
    console.log(`❌ ${err.message}`);
    appError = true;
    return;
  } finally {
    if (typeof appError === "undefined") {
      console.log("✅ Register valid.\n");
      console.log("Test starting...");
      console.log(`
Meta        
----------------------------------
Test Name: ${testName}
Test Type: ${testType} test
Test Functions: ${META.first.label} 🆚 ${META.second.label}
Test Measurement: ${measurement === "ms" ? "Milliseconds(ms)" : "Seconds(sec)"}
----------------------------------\n
Logs
----------------------------------`);
    }
  }
})();

function saveReport(label, result) {
  appResults.push({
    label: label,
    result: result,
  });
}

function testPerformance(func, label) {
  const start = process.hrtime.bigint();

  for (let i = 0; i < iterations; i++) func();

  const end = process.hrtime.bigint();
  const timeoutMeasurement = measurement === "ms" ? 1e6 : 1e9;
  const timeout = Number(end - start) / timeoutMeasurement;
  const res = timeout.toFixed(2);

  saveReport(label, res);

  console.log(`${label}, time: ${res} ${measurement}`);
}

const sumFunction = (a, b) => a + b;

function getResults(label) {
  let sum = 0;

  const filteredResults = appResults.filter((val) => val.label.includes(label));
  const finalResults = filteredResults.map((val) => val.result);

  finalResults.forEach((num) => {
    sum = sumFunction(sum, Number(num));
  });

  const median = sum / finalResults.length;
  return median;
}

const res = setInterval(() => {
  if (typeof appError !== "undefined") {
    clearInterval(res);
    return;
  }

  const round = Number(META.config.repeat - appRepeat) + 1;

  testPerformance(META.first.func, `${META.first.label}(f1), round: ${round}`);
  testPerformance(
    META.second.func,
    `${META.second.label}(f2), round: ${round}`
  );

  appRepeat--;

  if (appRepeat <= 0) {
    clearInterval(res);
    console.log("----------------------------------\n\n✅ Test completed.\n");
    return printResults();
  }
}, interval);

function printResults() {
  const firstFunctionMedian = getResults(META.first.label);
  const secondFunctionMedian = getResults(META.second.label);
  const medianDiff = Math.abs(
    firstFunctionMedian - secondFunctionMedian
  ).toFixed(2);

  const winner =
    firstFunctionMedian < secondFunctionMedian
      ? META.first.label
      : META.second.label;

  console.log(`Final Results
----------------------------------
Difference: ${medianDiff}(${measurement})
Winner: ${winner}\n

-------------------------------------------------
| round | label(f1) | label(f2) | diff | winner |

`);
}

/* ---------------------------------------------
 *  round | label(f1) | label(f2) | diff | winner
 *  1.    | 0.24(ms)  | 0.66(ms)  | +42  | f1
 *
 *
 *
 *
 *
 *
 *
 */
