import React from 'react';
import APIStore from '../stores/APIStore.js';
import * as APIActions from '../actions/APIActions.js';
import '../css/App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test1Results: { message: "Please wait ..." },
            test2Results: {}
        }
        this.startTest1 = this.startTest1.bind(this);
        this.startTest2 = this.startTest2.bind(this);
    }

    componentWillMount() {
        //listen to store event
        APIStore.on("TEST1_DONE", () => {
            //console.debug("TEST1_DONE event triggered...");
            this.setState({
                test1Results: APIStore.getTest1Results(),
            });
        });
        APIStore.on("TEST2_DONE", () => {
            //console.debug("TEST2_DONE event triggered...");
            this.setState({
                test2Results: APIStore.getTest2Results(),
            });
        });
    }

    componentDidMount() {
        APIActions.startTest1();
    }

    renderTest1Results(results) {
        console.debug("renderTest1Results: results:", results);
        let renderedResults = [];

        if (results.results) {
            console.debug("Test1 Results:",results.results);
            results.results.forEach(resultObj => {
                renderedResults.push(<div key={resultObj.num}>{resultObj.num + ": " + resultObj.result}</div>)
            });
        } else if (results.error) renderedResults.push(<div>{"error: " + results.error}</div>)
        else renderedResults.push(<div>{results.message}</div>);

        return renderedResults;
    }

    renderTest2Results(results) {
        console.debug("renderTest2Results: results:", results);
        let renderedResults = [];

        if (results.results) {
            console.debug("Test2 Results:",results.results);
            results.results.forEach(resultObj => {
                renderedResults.push(<div>{resultObj.subtext} - {resultObj.result}</div>)
            });
        } else if (results.error) renderedResults.push(<div>{"error: " + results.error}</div>)
        else renderedResults.push(<div>{results.message}</div>);

        return renderedResults;
    }


    renderTest1Inputs(inputs) {
        //console.debug("renderTest1Inputs: inputs:", inputs);
        let renderedInputs = [];
        if (inputs) {
            if (inputs.range) {
                renderedInputs.push(<div>Range - lower : {inputs.range.lower + ", upper: " + inputs.range.upper}</div>)
            } else if (inputs.error) renderedInputs.push(<div>{"error: " + inputs.error}</div>)
            else renderedInputs.push(<div>{inputs.message}</div>);

            if (inputs.divisors) {
                inputs.divisors.forEach(divisorObj => {
                    renderedInputs.push(<div>divisor : {divisorObj.divisor + ", output : " + divisorObj.output}</div>)
                });
            } else if (inputs.error) renderedInputs.push(<div>{"error: " + inputs.error}</div>)
            else renderedInputs.push(<div>{inputs.message}</div>);
        }
        return renderedInputs;
    }

    renderTest2Inputs(inputs) {
        //console.debug("renderTest2Inputs: inputs:", inputs);
        let renderedInputs = [];
        if (inputs) {
            if (inputs.searchTarget) {
                renderedInputs.push(<div>Text : {inputs.searchTarget}</div>)
            } else if (inputs.error) renderedInputs.push(<div>{"error: " + inputs.error}</div>)
            else renderedInputs.push(<div>{inputs.message}</div>);

            if (inputs.searchStrings) {
                renderedInputs.push(<h4>{"Search Strings: "}</h4>)
                inputs.searchStrings.forEach(searchString => {
                    renderedInputs.push(<div>{searchString}</div>)
                });
            } else if (inputs.error) renderedInputs.push(<div>{"error: " + inputs.error}</div>)
            else renderedInputs.push(<div>{inputs.message}</div>);
        }
        return renderedInputs;
    }

    render() {
        //console.debug("test1Results:", this.state.test1Results);
        //console.debug("test2Results:", this.state.test2Results);
        return (
            <div>
                <h2>Test1</h2>
                <h3>Inputs:</h3>
                <div className="inputs">{this.renderTest1Inputs(this.state.test1Results)}</div>
                <br />
                <h3>Results:</h3>
                <div className="results">{this.renderTest1Results(this.state.test1Results)}</div>
                <button onClick={this.startTest1}>Try Again</button>
                <hr />
                <h2>Test2</h2>
                <button onClick={this.startTest2}>Run Test2</button>
                <h3>Inputs:</h3>
                <div className="inputs">{this.renderTest2Inputs(this.state.test2Results)}</div>
                <h3>Results:</h3>
                <div className="results">{this.renderTest2Results(this.state.test2Results)}</div>
            </div>
        );
    }

    startTest1(event) {
        console.debug("startTest1 called...");

        this.setState({
            test1Results: {
                message: "Please wait ...",
                error: null
            }
        });
        APIActions.startTest1();
    }

    startTest2(event) {
        console.debug("startTest2 called...");

        this.setState({
            test2Results: {
                message: "Please wait ...",
                error: null
            }
        });
        APIActions.startTest2();
    }
}

export default App;