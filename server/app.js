const express = require('express');

const app = express();

app.listen(4000, () => {
    console.log("now listening to all requests on port 4000");
});