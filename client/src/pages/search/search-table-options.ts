import {OptionObject} from "../../redux/states/sort";

const sortOptions: OptionObject[] = [
  {
    items: [
      {internalName: 'asc', displayName: '升序'},
      {internalName: 'desc', displayName: '降序'},
    ],
    title: {internalName: 'sortOrder', displayName: '升/降'},
    selected: 'asc'
  },
  {
    items: [
      {internalName: '100', displayName: '100'},
      {internalName: '200', displayName: '200'},
      {internalName: '500', displayName: '500'},
    ],
    title: {internalName: 'rowPerPage', displayName: '行数'},
    selected: '100'
  },
];

export {sortOptions}
