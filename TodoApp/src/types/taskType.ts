export type TaskType = {
    id: number;
    title: string;
    description: string;
    done?: boolean;
}
export interface NewTaskType {
    title: string;
    description: string;
}
