import { Message } from '../models/Message';

export class Store{
    public messages:Message[];
    public messagesError:string;
}