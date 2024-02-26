export class Timer {
  constructor(
    public limit: number,
    public counter: number,
    public type: Type
  ) {}
}

export enum Type {
  Rest = 'Rest',
  Work = 'Work'
}
