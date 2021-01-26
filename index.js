const { ALL } = require('dns');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const Datastore = require('nedb');
const database = new Datastore('database.db');

const confirm = new Datastore('confirm.db');


database.loadDatabase();
confirm.loadDatabase();
app.listen(3000, () =>{
    console.log("listening at 3000");  
});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

app.get('/api',(request,response)=> {
    confirm.find({},(err, data)=>{
        if(err){
            response.end();
            return;
        }
        coordinates=[];
        data.forEach(itm => {

            const c = [];
            c.push(itm["latitude"]);
            c.push(itm["longitude"]);
            coordinates.push(c);
            
        });
        response.json(coordinates);
    });

});
app.get('/registrationData',(request,response)=>{
    database.find({},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        
        response.json(data);
    });
});
app.get('/confirmCaseData',(request,response)=>{
    confirm.find({},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        
        response.json(data);
    });
});

app.post('/login',(request,response)=> {
    req = request.body;
    confirm.find({email:req["email"]},(err, data)=>{
        if(err){
            response.end();
            return;
        }
        if(data.length == 0)
        {
            response.json("NOT_REGISTER");
            return;
        }
        

        confirm.find({pass2:req["pass"]},(err, data)=>{
            if(err){
                response.end();
                return;
            }
            if(data.length == 0)
            {
                response.json("PASSWORD_NOT_MATCHED");
                return;
            }

            confirm.remove({ email: req['email'] }, {}, function (err, numRemoved) {
                response.json("REMOVED");
              });
              
        });
    });

    


});

app.post('/deleteRegisterCase',(request,response)=> {
    req = request.body;
    
    database.remove({ _id: req['id'] }, {}, function (err, numRemoved) {
        response.json("REMOVED");
        });

});

app.post('/deleteConfirmCase',(request,response)=> {
    req = request.body;
    
    confirm.remove({ _id: req['id'] }, {}, function (err, numRemoved) {
        response.json("REMOVED");
        });

});

app.post('/updateConfirmCase',(request,response)=> {
    req = request.body;
    confirm.update({_id:req['id']},{name:req['name'],email:req['email'],pass2:req['pass2'],latitude:req["latitude"] - 0,longitude:req['longitude']-0},{},(err,numReplaced)=>{
        if(err)
        {
            response.end();
            return;
        }
        if(numReplaced > 0)
        {
            response.json("UPDATED");
        }
    });

});

app.post('/updateRegisterCase',(request,response)=> {
    req = request.body;
    database.update({_id:req['id']},{name:req['name'],email:req['email'],pass2:req['pass2'],latitude:req["latitude"] - 0,longitude:req['longitude']-0},{},(err,numReplaced)=>{
        if(err)
        {
            response.end();
            return;
        }
        if(numReplaced > 0)
        {
            response.json("UPDATED");
        }
    });

});
app.post('/getSingleConfirmCase',(request,response)=>{
    const req = request.body;
    confirm.find({_id:req['id']},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        if(data.length > 0)
        {
            response.json(data);
        }
        
    })
});

app.post('/getSingleRegisterCase',(request,response)=>{
    const req = request.body;
    database.find({_id:req['id']},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        if(data.length > 0)
        {
            response.json(data);
        }
        
    })
});

app.post('/acceptCase',(request,response)=> {
    req = request.body;
    database.find({_id:req["id"]},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        confirm.insert(data);
        database.remove({ _id: req['id'] }, {}, function (err, numRemoved) {
            response.json("ACCEPTED");
        });
    })
    

});

app.post('/api',(request,response)=>{

    const req = request.body;
    database.find({email:req['email']},(err,data)=>{
        if(err)
        {
            response.end();
            return;
        }
        if(data.length > 0)
        {
            response.json({
                status:'EMAIL_ALREADY_REGISTERED'
            })
            return;
        }
        
            database.insert(req);
            response.json({
            status:'success',
        });
        
    });
    
});