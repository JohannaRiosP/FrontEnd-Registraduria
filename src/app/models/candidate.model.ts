import { Politicalparty } from "./politicalparty.model";

export class Candidate {
    _id?: String;
    personalId?: String;
    resolutionNumber?: string;
    name?: String;
    lastname?: String
    politicalParty?: Politicalparty
}
