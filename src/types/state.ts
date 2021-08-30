import { Repo } from "./repo";

export interface UserState {
  data: { id: number, login: string }[];
  error: string;
  isLoading: boolean;
}

export interface RepoState {
  data: { [key in number]: Repo[] };
  error: string;
  isLoading: boolean;
}
