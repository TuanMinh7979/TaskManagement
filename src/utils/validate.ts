import { TaskGroupType, TaskType } from "../Types";

export const isEmpty = (data: string) => {
  return data === "";
};

export const validateGroupTask = ({ title }: TaskGroupType) => {
  let errorArray = [];
  if (isEmpty(title)) {
    errorArray.push("Title can not be empty");
  }
  return errorArray;
};
export const validateTask = ({ title, description }: TaskType) => {
  let errorArray = [];
  if (isEmpty(title)) {
    errorArray.push("Title can not be empty");
  }
  if (isEmpty(description)) {
    errorArray.push("Description can not be empty");
  }
  return errorArray;
};
