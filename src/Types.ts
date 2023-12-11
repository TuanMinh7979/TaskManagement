


export type taskGroupType = {
  id?: string;
  title: string;
  editMode?: boolean;
  tasks?: taskType[];
  tasksOrder?:[]
};

export type taskType = {
  id?: string;
  title: string;
  description: string;
  editMode?: boolean;
  collapsed?: boolean;
  due?: Date
  status?: string

};
