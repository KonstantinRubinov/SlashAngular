import { Store } from "./store";
import { Action } from "./action";
import { ActionType } from "./action-type";

export class Reducer{
    public static reduce(oldStore: Store, action:Action):Store{
        let newStore:Store = {...oldStore};

        switch(action.type){
            case ActionType.GetMessages:
                newStore.messages=action.payload;
                break;
            case ActionType.GetMessagesError:
                newStore.messagesError=action.payload;
                break;
            default:
                break;
        }

        return newStore;

    }
}