//const { response } = require("express");

$("document").ready(function(){
    const latitude = null;
    const longitude= null;
    let coordinates=[];
    $("#alert").hide();
    var mymap = L.map('mapid').setView([50.5, 30.5],4);
    createMap();
    const attribution = '&copy <a href= "https://www.openstreetmap.org/copyright">Openstreet</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl,{attribution});
    tiles.addTo(mymap);

    async function createMap(){
        await getCordinates();
        await getApiData();
        
        

        var heat = L.heatLayer(coordinates, 
        {
            radius: 25,
            max:1.0,
            gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'},
            minOpacity:0.8
        }).addTo(mymap);
        
                
    }


    async function getCordinates(){
        const response = await fetch("2.5_day.csv");
        const data = await response.text();
        const rows = data.split('\n');
        rows.forEach(elt=>{
            const row =elt.split(',');
            
            coordinates.push(row);
        })

        const  responce = await fetch('/api');
        const d = await responce.json();
        coordinates = await coordinates.concat(d);

    }
        

        //calculating nearest pationent distance
        
        
        function nearestPatientDistance(myloction,corona_patients){
            let min_distance = -1;
            corona_patients.forEach((patient,index,mylocation)=>{
                distance = calDistance(patient[0],patient[1],myloction[0],myloction[1]);
                if(distance < min_distance || min_distance == -1)
                {
                    min_distance = distance;
                }
            })
            
            return min_distance;
        }

        //calculating distance
        function calDistance(lat1, lon1, lat2, lon2) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                
                dist = dist * 1.609344
                return dist;
            }
        }

        //geting latitude and longitude
        let firstTime = true;
        function geoFindMe() {
            
            const status = document.querySelector('#status');
            const lat = document.querySelector('#latitude');
            const lon = document.querySelector('#longitude');
            const np = document.querySelector('#nearseat_patient');



            async function success(position) {
                const mylocation =[position.coords.latitude,position.coords.longitude];
                lat.textContent="latitude : "+mylocation[0];
                lon.textContent="longitude : "+mylocation[1];
                L.marker([mylocation[0],mylocation[1]]).addTo(mymap)
                status.textContent = '';
                if(firstTime)
                {
                    mymap.setView([mylocation[0], mylocation[1]],15 )
                    firstTime = false;
                }
                let nd = nearestPatientDistance(mylocation,coordinates).toFixed(1)
                np.textContent="Nearset case distance : "+nd+" km";
                if(nd - 0 <= 0.3)
                {
                    $("#alert").show();

                }
                
                //sending latitude and longitude to server
                // const latitude = mylocation[0];
                // const longitude = mylocation[1];
                // const data = { latitude,longitude};
                // console.log(data)
                // const options ={
                //     method:'POST',
                //     headers: {
                //     'Content-Type': 'application/json'
                //     },
                //     body:JSON.stringify(data)
                // };
                // const response = await fetch('/api',options);
                // const json = await response.json();
                // console.log(json);
            }

            function error() {
                status.textContent = 'Unable to retrieve your location';
            }

            if(!navigator.geolocation) {
                status.textContent = 'Geolocation is not supported by your browser';
            } else {
                status.textContent = 'Locating…';
                navigator.geolocation.getCurrentPosition(success, error);
            }

        }

        document.querySelector('#find-me').addEventListener('click', geoFindMe);
       if(!firstTime)
       {
        setInterval(geoFindMe, 5000);
       }
       global_covid_data = [];
       country_latlong = {};
       TotalConfirmed = 0;
    async function getApiData(){
       await fetch('https://api.covid19api.com/summary').then(response=> {return response.json()}).then(response=>{
        
        // console.log(response['Countries'][0]['Country']);
        
        // console.log(response['Countries'][0]['TotalConfirmed']);
        TotalConfirmed = response['Global']['TotalConfirmed'];
        response['Countries'].forEach(function(country){
            let row = [];
            row.push(country['Country']);
            row.push(country['TotalConfirmed']);
            global_covid_data.push(row);
            
        });
        
    }).then(
        function(){
            fetch("country_latlng.json").then(response=>{return response.json() }).then(response=>{
                response.forEach( function(country){
                    let row = [];
                    row.push(country['name']);
                    row.push(country['latlng']);
                    country_latlong[country['name']] = country['latlng'];
                    
                });

                global_covid_data.forEach(function(country){
                    let row = [];
                    row.push
                    country.push(country_latlong[country[0]]);
                })
             //   console.log(global_covid_data)
                global_covid_data.forEach(function(country){
                    if(typeof country[2] != 'undefined')
                    {

                    var circle = L.circle(country[2], {
                        color: "red",
                        fillColor: "#f03",
                        fillOpacity: 0.5,
                        radius: ((country[1]/TotalConfirmed)*100)*100000
                    }).addTo(mymap);
                    }
                      
                })
                })
                
        }
        
    )
    
    }
    
    
        
       
});