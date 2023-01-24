interface INote {
  id: string;
  content: string;
  date: string;
}

interface IModal {
  deleteNote: boolean;
}

export type { INote, IModal };
