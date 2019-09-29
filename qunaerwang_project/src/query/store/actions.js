// action type:
const INIT_QUERY_STRING = "query/init_query_string";

const types = {
    INIT_QUERY_STRING
}

export { types };



function getInitQueryObj(object){
    return {
        type: INIT_QUERY_STRING,
        queryObject: object
    }
}

const actions = {
    getInitQueryObj,
}

export { actions };