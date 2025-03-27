const httpModule = require('http');

const host = '0.0.0.0';
const port = 8000;

const users = [
    { id: 1, name: 'John Johnson' },
    { id: 2, name: 'Lika Beridze' },
    { id: 3, name: 'Luka shengelia' },
];

const authToken = "Bearer 9812371471823";

function requestListener (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET") {
        if (url.pathname === '/userInfo')  {
            res.writeHead(200);
            res.end(JSON.stringify(users));
        } else if (url.pathname.startsWith('/userInfo/')) {
            const userId = Number(url.pathname.substring(10));  
            
            if (isNaN(userId)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Error: userId must be a number!'
                }));
            } else {
                const user = users.filter(user => user.id === userId);
                if (user.length) {
                    res.writeHead(200);
                    res.end(JSON.stringify(user[0]));
                } else {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        success: false,
                        message: 'User with given Id could not be found'
                    }));
                }
            }
        }
    } else if (req.method === "POST") {
        if (url.pathname === '/addUser') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const newUser = JSON.parse(body);
                const ids = users.map(user => user.id);
                const maxId = Math.max(...ids);
                newUser.id = maxId + 1;
                users.push(newUser);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            });
        } 
    } else if (req.method === "DELETE") {
        if (url.pathname.startsWith('/deleteUser/')) {
            let token = req.headers.authorization;

            if (token !== authToken) {
                res.writeHead(401);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Unauthorized access'
                }));
            } else {
                const userId = Number(url.pathname.substring(12));

                if (isNaN(userId)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Error: userId must be a number!'
                    }));
                } else {
                    const userIndex = users.findIndex(user => user.id === userId);
                    if (userIndex !== -1) {
                        users.splice(userIndex, 1);
                        res.writeHead(200);
                        res.end(JSON.stringify({
                            success: true,
                            message: 'User deleted successfully'
                        }));
                    } else {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            success: false,
                            message: 'User with given Id could not be found'
                        }));
                    }
                }
            }
        }
    } else if (req.method === "PUT") {
        if (url.pathname === 'updateUser/') {
            res.writeHead(200);
            res.end(JSON.stringify(users));
        } else if (url.pathname.startsWith('/userInfo/')) {
            const userId = Number(url.pathname.substring(12));
            if(isNaN(userId)){
                res.writeHead(400);
                res.end(JSON.stringify({
                    success:false,
                    message: "Error: userId must be a number!"
                }))
            } else {
                let body='';
                req.on('data',chunk=>{
                    body+=chunk.toString()
            })

            req.on('end', () => {
                const updateUser = JSON.parse(body);
                const ids = users.map(user => user.id);
                const maxId = Math.max(...ids);
                updateUser.id = maxId + 1;
                users.push(updateUser);
                res.writeHead(201);
                res.end(JSON.stringify(updateUser));
                });
            }
        }
    } else if (req.method === "DELETE") {
        if (url.pathname.startsWith('deleteUser/:userId')) {
            let token = req.headers.authorization;

            if (token !== authToken) {
                res.writeHead(401);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Unauthorized access'
                }));
            } else {
                const userId = Number(url.pathname.substring(19));

                if (isNaN(userId)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Error: userId must be a number!'
                    }));
                } else {
                    const userIndex = users.findIndex(user => user.id === userId);
                    if (userIndex !== -1) {
                        users.splice(userIndex, 1);
                        res.writeHead(200);
                        res.end(JSON.stringify({
                            success: true,
                            message: 'User deleted successfully'
                        }));
                    } else {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            success: false,
                            message: 'User with given Id could not be found'
                        }));
                    }
                }
            }
        }
    }
};




const server = httpModule.createServer(requestListener);

server.listen(port, host, ()=> {
    console.log(`Server is running at http://${host}:${port}`);
})