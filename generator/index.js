const axios = require('axios');
let firstLineStart = { lat: 45.457888, lon: 9.179528 };
let secondLineStart = 2;
let thirdLineStart = 2;

let increment = 0.00010;

setInterval( async ()=> {
    console.log('Sent BUS 1');
    try {
        await axios.post('http://localhost:3000/data', {
            bus_id : 1,
            timestamp: new Date(),
            lat: firstLineStart.lat + increment,
            lon: firstLineStart.lon + increment
        });
        increment = increment + 0.00010;
    }catch(e) {
        console.log('SERVER DOWN')
    }
}, 3000);

setInterval( async ()=> {
    console.log('Sent BUS 2');
    try {
        await axios.post('http://localhost:3000/data', {
            bus_id : 2,
            timestamp: new Date(),
            lat: firstLineStart.lat - increment,
            lon: firstLineStart.lon - increment
        });
        increment = increment + 0.00010;
    }catch(e) {
        console.log('SERVER DOWN')
    }
}, 3000);
/*
setInterval( async () => {
    try {
        axios.post('http://localhost:3000/doors/:bus_id', {})
    } catch(e) {
        console.log('SERVER DOWN')
    }
}, 5000);*/