interface Option {
  internalName: string,
  displayName: string
}

interface Title {
  internalName: string,
  displayName: string
}

export interface OptionObject {
  items: Option[],
  title: Title,
  selected: string
}

export type DefaultSortState = OptionObject[];
const defaultSortState: DefaultSortState = [];

export default defaultSortState;
