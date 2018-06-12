import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";

class APIStore extends EventEmitter {

    constructor() {
        super();
        this.test1Results = [];
        this.test2Results = [];
    }

    getTest1Results() {
        return this.test1Results;
    }

    getTest2Results() {
        return this.test2Results;
    }

    startTest1(args) {
        //fetch config    
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        fetch('/api/test1', options)
            .then(resp => resp.json())
            .then(data => {
                // code for handling the data from the API
                //console.log("fetch succesful, data:", data);
                this.test1Results = data;
                this.emit("TEST1_DONE");
            })
            .catch(function (err) {
                // if the server returns any errors
                console.error(err);
                this.test1Results = { error: err };
                this.emit("TEST1_DONE");
            }.bind(this));
    }

    startTest2(args) {
        //fetch config    
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        fetch('/api/test2', options)
            .then(resp => resp.json())
            .then(data => {
                // code for handling the data from the API
                //console.log("fetch succesful, data:", data);
                this.test2Results = data;
                this.emit("TEST2_DONE");
            })
            .catch(function (err) {
                // if the server returns any errors
                console.error(err);
                this.test2Results = { error: err };
                this.emit("TEST2_DONE");
            }.bind(this));
    }

    handleActions(action) {
        //console.log("APIStore received an action:", action);
        switch (action.type) {
            case "TEST1": {
                this.startTest1(action.args);
                break;
            }
            case "TEST2": {
                this.startTest2(action.args);
                break;
            }
        }
    }

}

const apiStore = new APIStore;
Dispatcher.register(apiStore.handleActions.bind(apiStore));
export default apiStore;