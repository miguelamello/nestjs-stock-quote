import { Message } from 'squiss-ts';
import { Observable } from 'rxjs';
import { queryParams } from '../interfaces/queryParam.interface';
export declare class AwsSqsService {
    private readonly squiss;
    private readonly message$;
    constructor();
    getMessage$(): Observable<Message>;
    onMessage(message: Message): void;
    startListening(): void;
    start(): Promise<void>;
    sendMessage(message: queryParams): Promise<void>;
}
