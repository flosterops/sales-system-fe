export interface IBusinessNote {
  businessNoteAttachments: Array<any>;
  content: string;
  createdOn: string;
  fullName: string | null;
  id: string;
  noteType: string;
  taskId: string;
  websiteUserId: string | null;
}

export interface ITaskDetail {
  id: string;
  scheduledToTime: string;
  createdOn: string;
  typeKey: string;
  businessNotes: IBusinessNote[];
  taskDisplayName: string;
}

export interface ITaskState {
  tasks: ITaskDetail[] | [];
  error: string | null;
  loading: boolean;
  newTaskId: string | null;
}
