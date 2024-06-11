const express = require('express');

const camelCaseDeep = require('camelcase-object-deep');
 const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelCaseDeep(data));
    };
    next();
});

 app.use('/api', routes);




app.listen(4000, () => console.log('server started'));