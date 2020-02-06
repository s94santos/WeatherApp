const buildQueryString = (cities) => {
    let base = '/api/weather?';
    cities.forEach((city, index) => {
        base = `${base}cities[]=${city}`
        if(index < cities.length - 1){
        base += '&';
        } 
    });
    return base;
}

const parseResponse = (res) => {
    let obj = {
        name:[],
        tmp:[],
        minTmp:[],
        maxTmp:[]
    };
    for (const [key,value] of Object.entries(res)){
        obj.name.push(key);
        obj.tmp.push(value.temp); 
        obj.minTmp.push(value.temp_min)  
        obj.maxTmp.push(value.temp_max)    
    }
    return obj;
}

module.exports = {
    buildQueryString,
    parseResponse
}