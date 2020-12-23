import {OptionObject} from "../../app/filter-table/redux/states/sort";

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
      {internalName: '20', displayName: '20'},
      {internalName: '50', displayName: '50'},
      {internalName: '100', displayName: '100'},
    ],
    title: {internalName: 'rowPerPage', displayName: '行数'},
    selected: '20'
  },
];

export {sortOptions}
