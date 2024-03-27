import _ from "lodash";
import * as R from "ramda";
import { CheckPerformance } from "./util";

const data: { [counter: string]: number }[] = [];
for (var i = 0; i < 10000; i++) {
  data.push({ counter: i });
}

function isOdd(num: number) {
  return num % 2 === 1;
}

function square(num: number) {
  return num * num;
}

function lessThanThreeDigits(num: number) {
  return num.toString().length < 3;
}

function Compare() {
  const lodashPerformance = new CheckPerformance();
  const ramdaPerformance = new CheckPerformance();

  lodashPerformance.start();
  const lodashResult = _.chain(data)
    .map((d) => _.get(d, "counter"))
    .filter(isOdd)
    .map(square)
    .filter(lessThanThreeDigits)
    .value();
  lodashPerformance.end();

  ramdaPerformance.start();
  const ramdaResult = R.filter(
    lessThanThreeDigits,
    R.map(square, R.filter(isOdd, R.pluck("counter", data)))
  );
  ramdaPerformance.end();

  return (
    <div>
      <div>
        <p>{`lodash performance: ${lodashPerformance.getPerformanceInMilliSeconds()}`}</p>
        <p>{`ramda performance: ${ramdaPerformance.getPerformanceInMilliSeconds()}`}</p>
      </div>
    </div>
  );
}

export default Compare;
