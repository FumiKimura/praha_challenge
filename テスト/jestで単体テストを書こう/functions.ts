import { randomIntegersApiService } from "./randomIntegersApiService";
import { RandomIntegerArrayMock } from "./util";

/*
* 配列に格納されている数字を2乗した合計を返す
*/
export function sumOfSquare(numbers: number[]): number {
    return numbers.reduce((total, num) => {
        return total += num ** 2;
    }, 0);
}

/*
* ランダムに数配列を生成し2乗した合計を返す
*/
export function sumOfSquareRandomNumbers(): number {
    const randomNumbers = new RandomIntegerArrayMock
    const array = randomNumbers.generateRandomNumberArray(1, 10, 20);
    return sumOfSquare(array);
}

/*
* 外部APIにからランダムな数配列を取得し2乗した合計を返す
*/
export async function sumOfSquareFromApi(): Promise<number> {
    const api = new randomIntegersApiService()
    const randomNumbers = await api.getRandomIntegers(1,10,100);
    return sumOfSquare(randomNumbers);
}