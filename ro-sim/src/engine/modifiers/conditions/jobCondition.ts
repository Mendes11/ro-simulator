import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { JobIds } from "@/engine/types/enums";
import { JobConditionData } from "./types/config";

export class JobCondition implements iCondition {
    jobs: JobIds[]

    public constructor(data: JobConditionData) {
        this.jobs = data.jobs;
    }

    check(data: ConditionCheckData) {
        return this.jobs.includes(data.character.job.id)
    }
}