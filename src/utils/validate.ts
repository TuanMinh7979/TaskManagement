import { taskGroupType, taskType } from "../Types";

export const isEmpty = (data: string) => {
  return data === "";
};

export const validateGroupTask = ({ title }: taskGroupType) => {
  let errorArray = [];
  if (isEmpty(title)) {
    errorArray.push("Title can not be empty");
  }
  return errorArray;
};
export const validateTask = ({ title, description }: taskType) => {
  let errorArray = [];
  if (isEmpty(title)) {
    errorArray.push("Title can not be empty");
  }
  if (isEmpty(description)) {
    errorArray.push("Description can not be empty");
  }
  return errorArray;
};
