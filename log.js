function _log(action, item) {
    const fs = require('fs');
    const moment = require('moment');
    const timeStamp = moment().format('lll');
    const logFile = 'data/stats.json';
    let logData = {
        'action': action,
        'item': item,
        'time': timeStamp
    };

    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let fileText = JSON.parse(data);
            fileText.push(logData);
            fs.writeFile(logFile, JSON.stringify(fileText, null, 1), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
};
module.exports = {
    _log: _log
};

// class Logger {
//     constructor(action, item) 
//     {
//         this.fs = require('fs');
//         this.moment = require('moment');
//         this.action = action;
//         this.items = item;
//         this.timeStamp = moment().format('lll');
//         this.file = 'data/stats.json';
//         this.logAction();
//     }

//     logAction() {
//         fs.readFile(this.file, 'utf8', (err, data) => {
//             if (err) {
//                 res.send('{"result": 0}');
//             } else {
//                 let fileText = JSON.parse(data);
//                 fileText.push
//                 fs.writeFile(this.file, JSON.stringify(fileText, null, 2 ), (err) => {
//                     if (err) {
//                         res.send('{"result": 0}');
//                     } else {
//                         res.send('{"result": 1}');
//                     }
//                 });
//             }
//         });
//     }
// }