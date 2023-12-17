import axios  from 'axios';

export class randomIntegersApiService {
    public async getRandomIntegers(min: number, max: number, count: number): Promise<number[]> {
        const { data } = await axios.get(
            "http://www.randomnumberapi.com/api/v1.0/random"
            + `?min=${min}&max=${max}&count=${count}`
        );
        console.log(data);
        return data;
    }
}