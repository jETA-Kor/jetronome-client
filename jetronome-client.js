const request = require('request');

// Server URL
let server = 'http://localhost:7828';

// 상태값
const stat = {};

const logger = (log, type) => {
    const logType = type || 'log';

    const getTwoDigits = (num) => {
        return (num < 10) ? '0' + num : num;
    };

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let msg = '';
    msg += '[Jetronome] ';
    msg += '[';
    msg += year;
    msg += '-';
    msg += getTwoDigits(month);
    msg += '-';
    msg += getTwoDigits(date);
    msg += ' ';
    msg += getTwoDigits(hours);
    msg += ':';
    msg += getTwoDigits(minutes);
    msg += ':';
    msg += getTwoDigits(seconds);
    msg += '] ';
    msg += log;

    console[logType](msg);
};

const sender = () => {
    request({
        method: 'POST',
        uri: server + '/check' + (stat.data.description ? '?init=1' : ''),
        form: stat.data,
    }, (err, res) => {
        if (err || (res.statusCode !== 200)) {
            logger('Unexpected response.', 'error');

            stat.data = {
                name: stat.name,
                ip: stat.ip,
                description: stat.description,
                testApi: stat.testApi,
                interval: stat.interval,
            };

            return true;
        }

        if (stat.data.description) {
            stat.data = {
                name: stat.name,
            };
        }
    });
};

/**
 * 초기화
 * @param {Object} info App 정보
 * @param {string} info.name App 이름
 * @param {string} info.description App 설명
 * @param {string} info.server 서버 URI
 * @param {Number} [info.port] 서버 포트 (기본값: 7828)
 * @param {string} [info.testApi] Test API 경로
 * @param {Number} [info.interval] 신호 발송 주기 (ms)
 * @param {boolean} [info.autoStart] 초기화 후 자동 실행 여부
 * @return {Object} 오류 정보
 */
const init = (info) => {
    if (!info.name || !info.description || !info.server) {
        return {
            error: 'BAD_INFORMATION',
            description: '필수 데이터가 누락되었습니다.',
        };
    }

    server = info.server + ':' + (info.port || 7828);

    stat.name = info.name;
    stat.description = info.description;
    stat.testApi = info.testApi;
    stat.interval = info.interval || 5000;

    logger('Initialized.');

    if (info.autoStart) {
        start();
    }

    return {};
};
module.exports.init = init;

/**
 * 신호 발생 시작
 * @return {Object} 오류 정보
 */
const start = () => {
    if (process.env.JETRONOME === 'ignore') {
        return {
            error: 'JETRONOME_IGNORED',
            description: 'Node 환경변수 설정에 따라 신호를 보내지 않습니다.',
        };
    }

    if (stat.job && !stat.force) {
        return {
            error: 'ALREADY_STARTED',
            description: '이미 시작 명령이 실행되었습니다.',
        };
    }

    if (stat.force) {
        console.log('I sure hope you know what you are doing.');
        clearInterval(stat.job || -1);
    }

    stat.data = {
        name: stat.name,
        ip: stat.ip,
        description: stat.description,
        testApi: stat.testApi,
        interval: stat.interval,
    };

    sender();
    stat.job = setInterval(sender, stat.interval);

    logger('Started.');

    return {};
};
module.exports.start = start;
