import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { CounterResponse, ICounterService } from '../counter.interface';

export class CounterService implements ICounterService {
    private counterUrl: string;

    constructor() {
        // In the future, we could integrate other counter services
        this.counterUrl = 'https://api.countapi.xyz';
    }

    async get(namespace: string, key: string): Promise<CounterResponse> {
        if (!namespace || !key) {
            return {
                value: null,
            };
        }

        const axiosRequest: AxiosRequestConfig = {
            url: `${this.counterUrl}/get/${namespace}/${key}`,
            method: 'GET',
        };

        console.log(`Getting count for namespace ${namespace} and key ${key}`);

        try {
            const response: AxiosResponse = await axios(axiosRequest);

            return {
                value: response?.data?.value,
            };
        } catch (error) {
            console.error(`Error when getting count. ${error}`);
        }

        return {
            value: null,
        };
    }

    async count(namespace: string, key: string): Promise<CounterResponse> {
        if (!namespace || !key) {
            return {
                value: null,
            };
        }

        const axiosRequest: AxiosRequestConfig = {
            url: `${this.counterUrl}/hit/${namespace}/${key}`,
            method: 'GET',
        };

        console.log(`Counting for namespace ${namespace} and key ${key}`);

        try {
            const response: AxiosResponse = await axios(axiosRequest);

            return {
                value: response?.data?.value,
            };
        } catch (error) {
            console.error(`Error when counting. ${error}`);
        }

        return {
            value: null,
        };
    }
}
