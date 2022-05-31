const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

const memory = require('memory');

memory.M = 0;

app.post('/resetMemory', (req, res) => {
    try {
        memory.M = 0;
        res.status(200);
        res.json({msg: memory.M.toString()});
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
});

app.post('/calc/:operation/:num', (req, res) => {
    try {
        let num = Number(req.params.num);
        let operation = String(req.params.operation);
        if (operation === "plus"){
            memory.M += num;
        }else if (operation === "minus"){
            memory.M -= num;
        }else if (operation === "multiply"){
            memory.M *= num;
        }
        res.status(200);
        res.json({msg: memory.M.toString()});
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

