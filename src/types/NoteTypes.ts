interface INote {
  id: string;
  content: string;
}

interface IModal {
  deleteNote: boolean;
}

export type { INote, IModal };
