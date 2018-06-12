const axios = require('axios');

const reckonHost = 'https://join.reckon.com/';
const reckonEP1 = reckonHost + 'test1/rangeInfo';
const reckonEP2 = reckonHost + 'test1/divisorInfo';
const reckonEP3 = reckonHost + 'test2/textToSearch';
const reckonEP4 = reckonHost + 'test2/subTexts';
const reckonEP5 = reckonHost + 'test2/submitResults';

const reckonAPI = {};

export default reckonAPI;

reckonAPI.rangeInfo = async function () {
    let data = {};
    try {
        const responseEP1 = await axios.get(reckonEP1);
        let range = responseEP1.data;
        console.log("range:", range);
        const responseEP2 = await axios.get(reckonEP2);
        data.range = range;
        let divisors = responseEP2.data.outputDetails;
        console.log("divisors:", divisors);
        data.divisors = divisors;
        data.results = findDivisors(range, divisors);
    } catch (error) {
        console.error(error);
        data.error = error;
    }
    return data;
}

reckonAPI.search = async function (headers) {
    let data = {};
    try {
        const responseEP3 = await axios.get(reckonEP3);
        //console.log("responseEP3:", responseEP3);
        let searchTarget = responseEP3.data.text;
        console.log("searchTarget:", searchTarget);
        data.searchTarget = searchTarget;
        const responseEP4 = await axios.get(reckonEP4);
        //console.log("responseEP4:", responseEP4);
        let searchStrings = responseEP4.data.subTexts;
        console.log("searchStrings:", searchStrings);
        data.searchStrings = searchStrings;
        data.results = findSearchStrings(searchTarget, searchStrings);
        console.log("results:", data.results);

        data.postResults = await postResults(data, headers);

    } catch (error) {
        console.error(error);
        data.error = error;
    }
    return data;
}

const postResults = async function (data, headers) {
    let postData = {};
    postData.candidate = "Bobby Joseph",
        postData.text = data.searchTarget;
    postData.results = data.results;
    console.log("postData:", postData);

    let status;
    try {
        const responseEP5 = await axios.post(reckonEP5, postData, headers);
        status = responseEP5.data;
    } catch (error) {
        console.error("Error in postResults...");
        console.error(error);
        status = error;
        if (error.response && error.response.data)
            status = error.response.data
    }
    return status;
}

const findSearchStrings = function (searchTarget, searchStrings) {
    //case insensitive
    searchTarget = searchTarget.toLowerCase();
    let results = [];
    for (let i = 0; i < searchTarget.length; i++) {
        searchStrings.forEach(searchStringIn => {
            //case insensitive
            let searchString = searchStringIn.toLowerCase();
            if ((searchString[0] == searchTarget[i]) && matches(extractString(searchTarget,i), searchString, i)) {
                if (!results[searchStringIn])
                    results[searchStringIn] = [];
                results[searchStringIn].push(i + 1);
            }
        });
    }

    searchStrings.forEach(searchStringIn => {
        if (!results[searchStringIn]) {
            results[searchStringIn] = ["<No Output>"];
        }
    });

    results = formatResults(results);
    console.debug("results:", results);
    return results;
}

const formatResults = function (results) {
    let formattedResults = [];
    let keys = Object.keys(results);
    keys.forEach(key => {
        formattedResults.push({
            "subtext": key,
            "result": results[key].join(", ")
        });
    })
    return formattedResults;
}

const matches = function (target, searchString) {
    let match = true;
    for (let i = 0; i < searchString.length; i++) {
        if (searchString[i] !== target[i]) {
            match = false;
            break;
        }
    }
    return match;
}

const extractString = function (line, startIndex) {
    let result = [];    
    for (let i = startIndex; i < line.length; i++) {
        result.push(line[i]);
    }
    return result.join("");
}

const findDivisors = function (range, divisors) {
    let results = [];
    let result;
    for (let i = range.lower; i <= range.upper; i++) {
        result = "";
        divisors.forEach(divisorObj => {
            if (i % divisorObj.divisor == 0) {
                result += divisorObj.output;
            }
        });
        results.push({
            num: i,
            result: result
        });
    }
    return results;
}