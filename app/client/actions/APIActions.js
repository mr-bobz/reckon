import Dispatcher from "../Dispatcher";

export function startTest1(args) {
    Dispatcher.dispatch({
        type: "TEST1",
        args: args
    })
}

export function startTest2(args) {
    Dispatcher.dispatch({
        type: "TEST2",
        args: args
    })
}