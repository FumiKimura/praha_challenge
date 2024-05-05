export class RandomIntegerArrayMock {
    public generateRandomNumberArray(min: number, max: number, size: number): number[] {
        const randomNumbers = [];
        for(let i = 0; i < size; i++){
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomNumbers.push(randomNumber);
        }

        return randomNumbers;
    }
}