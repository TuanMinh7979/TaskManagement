


export type TaskGroupType = {
  id?: string;
  title: string;
  editMode?: boolean;
  tasks?: TaskType[];
  tasksOrder?:[]
};

export type TaskType = {
  id?: string;
  title: string;
  description: string;
  editMode?: boolean;
  collapsed?: boolean;
  due?: Date
  status?: string

};
