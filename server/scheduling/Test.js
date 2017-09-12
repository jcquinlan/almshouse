var schedule = require('node-schedule');

class TestScheduler {
    constructor() {
        this.task = schedule.scheduleJob('* * * * * *', () => {
            console.log('RUNNING TASK');
        })
    }
}

exports.TestScheduler = TestScheduler;