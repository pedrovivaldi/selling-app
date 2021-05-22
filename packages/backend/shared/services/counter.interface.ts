export interface CounterResponse {
    value: string | null;
}

export interface ICounterService {
    get(namespace: string, key: string): Promise<CounterResponse>;
    count(namespace: string, key: string): Promise<CounterResponse>;
}
