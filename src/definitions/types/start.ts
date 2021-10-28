export interface IDemandQuestions {
  id: number | string;
  type?: string;
  name?: string;
  questions: any;
  changeUnit?: string;
  title: string;
}

export interface IComponentsData {
  [key: string]: IDemandQuestions[];
}

export interface IDetailQuestions extends IDemandQuestions {
  step: string | number;
  format: string;
  options: IOptionsProps[];
  question: string;
}

export interface IOptionsProps {
  id: string;
  name?: string;
  type?: string;
  title?: string;
  header?: string;
  value?: string;
  attribute?: string;
  placeholder?: string;
  children?: IOptionsChildren[] | undefined;
}

export interface IOptionsChildren {
  id: number | string;
  type?: string;
  title?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  unit?: string;
  id1?: string;
  id2: string;
  placeholder1?: string;
  placeholder2?: string;
  inputType?: string;
}
