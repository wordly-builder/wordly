import type {ObjectId} from "mongodb";

interface Universe {
    _id: ObjectId;
    name: string;
    owner: string;
}
