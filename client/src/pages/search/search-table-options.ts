import {OptionObject} from "../../app/filter-table/redux/states/sort";
import {
  MultipleFilterInitializer,
  RangeFilterInitializer,
  SingleFilterInitializer
} from "../../app/filter-table/redux/actions/filter/init-filter";
import {FilterTypes} from "../../app/filter-table/redux/states/filter";

const sortOptions: OptionObject[] = [
  // {
  //   items: [
  //     {internalName: 'id', displayName: 'id'},
  //     {internalName: 'age', displayName: 'age'},
  //     {internalName: 'sex', displayName: 'sex'},
  //     {internalName: 'severity', displayName: 'severity'},
  //     {internalName: 'death', displayName: 'death'},
  //   ],
  //   title: {internalName: 'sortBy', displayName: 'sort by'},
  //   selected: 'id'
  // },
  {
    items: [
      {internalName: 'asc', displayName: 'ascending'},
      {internalName: 'desc', displayName: 'descending'},
    ],
    title: {internalName: 'sortOrder', displayName: 'sort order'},
    selected: 'asc'
  },
  {
    items: [
      {internalName: '20', displayName: '20'},
      {internalName: '50', displayName: '50'},
      {internalName: '100', displayName: '100'},
    ],
    title: {internalName: 'rowPerPage', displayName: 'row per page'},
    selected: '20'
  },
];

const filterOptions: Array<RangeFilterInitializer | MultipleFilterInitializer | SingleFilterInitializer> = [
  // {
  //   type: FilterTypes.range,
  //   displayName: 'age',
  //   internalName: 'age',
  //   min: '1',
  //   max: '100'
  // }, {
  //   type: FilterTypes.multiple,
  //   displayName: 'sex',
  //   internalName: 'sex',
  //   choices: [
  //     {
  //       internalName: '1',
  //       displayName: '1 (male)'
  //     }, {
  //       internalName: '2',
  //       displayName: '2 (female)'
  //     }
  //   ],
  //   original: [
  //     {
  //       internalName: '1',
  //       displayName: '1 (male)'
  //     }, {
  //       internalName: '2',
  //       displayName: '2 (female)'
  //     }
  //   ]
  // }, {
  //   type: FilterTypes.multiple,
  //   displayName: 'severity',
  //   internalName: 'severity',
  //   choices: [
  //     {
  //       internalName: '1',
  //       displayName: '1'
  //     }, {
  //       internalName: '2',
  //       displayName: '2'
  //     }, {
  //       internalName: '3',
  //       displayName: '3'
  //     }
  //   ],
  //   original: [
  //     {
  //       internalName: '1',
  //       displayName: '1'
  //     }, {
  //       internalName: '2',
  //       displayName: '2'
  //     }, {
  //       internalName: '3',
  //       displayName: '3'
  //     }
  //   ]
  // }, {
  //   type: FilterTypes.single,
  //   displayName: 'demo only',
  //   internalName: 'demoOnly',
  //   choices: [
  //     {
  //       internalName: 'option1',
  //       displayName: 'option1'
  //     }, {
  //       internalName: 'option2',
  //       displayName: 'option2'
  //     }, {
  //       internalName: 'option3',
  //       displayName: 'option3'
  //     }, {
  //       internalName: 'option4',
  //       displayName: 'option4'
  //     }
  //   ],
  //   original: {
  //     internalName: 'option4',
  //     displayName: 'option4'
  //   }
  // }
];

export {sortOptions, filterOptions}
