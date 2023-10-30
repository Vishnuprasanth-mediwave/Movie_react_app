export interface IMovie {
  id: number;
  title: string;
  year: number;
}
export interface IMovieAdd {
  title: string;
  year: number;
}
export interface IShowError {
  action: string;
  msg: string;
}
