interface INote {
  id: string;
  content: string;
  date: string;
}

interface IModal {
  deleteNote: boolean;
}

interface ICredential {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  email: string;
}

export type { INote, IModal, ICredential, IUser };
