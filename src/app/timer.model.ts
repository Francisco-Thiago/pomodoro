export class Timer {
  constructor(
    public limit: number,
    public counter: number,
    public sessions: number,
    public type: Type
  ) {}
}

export enum Type {
  Work = 'Work',
  Rest = 'Rest',
}
