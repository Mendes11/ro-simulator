import { ConditionCheckData, iCondition } from "@/types/condition";
import { JobIds } from "@/types/jobs";

export type JobConditionData = {
    jobs: JobIds[]
}

export class JobCondition implements iCondition {
    jobs: JobIds[]

    public constructor(data: JobConditionData) {
        this.jobs = data.jobs;
    }

    check(data: ConditionCheckData) {
        return this.jobs.includes(data.character.job.id)
    }
}