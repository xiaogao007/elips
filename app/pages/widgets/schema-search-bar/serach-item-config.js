import input from './conplex-view/input/input.vue'
import select from './conplex-view/select/select.vue'
import dynamicSelect from './conplex-view/dynamic-select/dynamic-select.vue'
import dateRange from './conplex-view/date-range/date-range.vue'
const SearchItemConfig = {
    input: {
        component: input
    },
    select: {
        component: select
    },
    dynamicSelect: {
        component: dynamicSelect
    },
    dateRange: {
        component: dateRange
    },
}
export default SearchItemConfig