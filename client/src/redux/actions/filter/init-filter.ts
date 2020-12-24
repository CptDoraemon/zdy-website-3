import {filterActions} from "./filter";
import {cloneDeep} from "lodash";
import {Choice, FilterState, FilterTypes} from "../../states/filter";

const getBaseFilterObj = (displayName: string, internalName: string, type: FilterTypes, choices: Choice[], original: Choice[]): FilterState => {
  return {
    displayName,
    internalName,
    type,
    choices: cloneDeep<Choice[]>(choices),
    original: cloneDeep<Choice[]>(original),
    active: cloneDeep<Choice[]>(original),
    pending: cloneDeep<Choice[]>(original),
    validationMessage: ''
  }
};

const getOptionObject = (displayName: string, internalName: string): Choice => ({
  displayName,
  internalName
});

const getRangeFilter = (displayName: string, internalName: string, min: string, max: string): FilterState => {
  return getBaseFilterObj(
    displayName,
    internalName,
    FilterTypes.range,
    [getOptionObject(min, min), getOptionObject(max, max)],
    [getOptionObject(min, min), getOptionObject(max, max)]
  );
};

const getSingleFilter = (displayName: string, internalName: string, choices: Choice[], original: Choice[]): FilterState => {
  return getBaseFilterObj(displayName, internalName, FilterTypes.single, choices, original)
};

const getMultipleFilter = (
  type: FilterTypes.multipleTextarea | FilterTypes.multiple,
  displayName: string,
  internalName: string,
  choices: Choice[],
  original: Choice[]): FilterState => {
  return getBaseFilterObj(displayName, internalName, type, choices, original)
};

interface FilterBaseInitializer {
  displayName: string,
  internalName: string
}

export interface RangeFilterInitializer extends FilterBaseInitializer {
  type: FilterTypes.range,
  min: string,
  max: string
}

export interface MultipleFilterInitializer extends FilterBaseInitializer {
  type: FilterTypes.multiple,
  choices: Choice[],
  original: Choice[],
}

export interface SingleFilterInitializer extends FilterBaseInitializer {
  type: FilterTypes.single,
  choices: Choice[],
  original: Choice,
}

export interface MultipleFilterTextareaInitializer extends FilterBaseInitializer {
  type: FilterTypes.multipleTextarea,
  choices: Choice[],
  original: Choice[],
}

export type FilterInitializers = RangeFilterInitializer | MultipleFilterInitializer | SingleFilterInitializer | MultipleFilterTextareaInitializer;

const initFilter = (
  filters: Array<FilterInitializers>
) => {
  const filtersState: FilterState[] = [];
  filters.forEach(obj => {
    switch (obj.type) {
      case FilterTypes.range:
        filtersState.push(getRangeFilter(obj.displayName, obj.internalName, obj.min, obj.max));
        break;
      case FilterTypes.multiple:
        filtersState.push(
          getMultipleFilter(
            obj.type,
            obj.displayName,
            obj.internalName,
            obj.choices.map(choice => getOptionObject(choice.displayName, choice.internalName)),
            obj.original.map(choice => getOptionObject(choice.displayName, choice.internalName))
          ));
        break;
      case FilterTypes.multipleTextarea:
        filtersState.push(
          getMultipleFilter(
            obj.type,
            obj.displayName,
            obj.internalName,
            obj.choices.map(choice => getOptionObject(choice.displayName, choice.internalName)),
            obj.original.map(choice => getOptionObject(choice.displayName, choice.internalName))
          ));
        break;
      case FilterTypes.single:
        filtersState.push(
          getSingleFilter(
            obj.displayName,
            obj.internalName,
            obj.choices.map(choice => getOptionObject(choice.displayName, choice.internalName)),
            [obj.original].map(_ => getOptionObject(_.displayName, _.internalName))
          ));
        break;
      default:
        return false
    }
  });

  return {
    type: filterActions.FILTER_INIT_FILTER,
    filters: cloneDeep(filtersState)
  }
};

export default initFilter
