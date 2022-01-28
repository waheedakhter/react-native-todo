export interface ToDo {
  id: string;
  description: string;
  dateTime: Date;
  isDone: boolean;
}

export interface Todos {
  [key: string]: ToDo;
}
