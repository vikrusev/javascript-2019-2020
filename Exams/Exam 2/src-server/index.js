const express = require('express');
const cors = require('cors');
const psList = require('ps-list');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const POLL_TIME = 2000; // in ms
const NO_DATA = 'No data aavilable for process';


io.on('connection', (socket) => {
    let interval = null;
    console.log('a user has connected');

    socket.on('disconnect', function () {
        console.log('a user has disconnected');
    });

    socket.on('start-polling', ({ pid }) => {
        let psResult = null;
        let response = null;
        
        // check on backend if the client is already polling
        if (!interval) {
            interval = setInterval(async () => {
                psResult = await checkProcess(pid);
    
                if (!psResult) {
                    response = {
                        status: 'error',
                        data: `${NO_DATA} with pid: ${pid}` 
                    }
                }
                else {
                    response = {
                        status: 'success',
                        data: psResult
                    }
                }
    
                socket.emit('return-ps-data', response);
            }, POLL_TIME);
        }
    });

    socket.on('stop-polling', () => {
        clearInterval(interval);
        interval = null;
    });
});

checkProcess = async (pid) => {
    const allData = await psList();
    
    let pidData = allData.find(ps => ps.pid == pid);

    if (pidData) {
        pidData.mockData = {
            cpuUsage: 123,
            otherData: "dsaasdasd"
        };
    }

    return pidData;
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8082;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});