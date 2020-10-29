class Message extends Error {
    constructor(status, code, message) {
        super(message);

        this.status = status;
        this.code = code;
        this.message = message;
    }

    toJSON() {
        return {
            status: this.status,
            code: this.code,
            message: this.message
        };
    }

    /**
     * Not Founds
     */

    static get LOGIN_FAILED() {
        return new Message(400, 'login_failed', '아이디 혹은 비밀번호가 일치하지 않습니다.');
    }

    static INVALID_PARAM(name) {
        return new Message(400, `invalid_parameter:${name}`, name + '을(를) 입력해주세요.');
    }

    static ALREADY_EXIST(name) {
        return new Message(400, `already_exist:${name}`, '이미 존재하는 ' + name + ' 입니다.');
    }

    static NOT_EXIST(name) {
        return new Message(400, `NOT_EXIST_${name}`, '존재하지 않는 ' + name + ' 입니다.');
    }

    static WRONG_PARAM(name) {
        return new Message(400, `WRONG_PARAM_${name}`, '올바르지 않은 ' + name + ' 입니다.');
    }

    static get WRONG_FILE_TYPE() {
        return new Message(400, `wrong_file_type`, '파일의 확장자가 올바르지 않습니다.');
    }

    static get UNAUTHORIZED() {
        return new Message(401, 'unauthorized', '로그인 정보가 존재하지 않습니다. 로그인 해주세요.');
    }

    static get FORBIDDEN() {
        return new Message(403, 'forbidden', '권한이 없습니다.');
    }

    static MISMATCH(name) {
        return new Message(400, 'mismatch_' + name, `${name} 이(가) 일치하지 않습니다.`)
    }




    static get SERVER_ERROR() {
        return new Message(500, 'Server_error', 'Please try again.');
    }


    static is(target, message) {
        if (!(target instanceof Message)) {
            return false;
        }

        if (arguments.length === 1) {
            return true;
        }

        return target.status === message.status &&
            target.code === message.code;
    }

}

const code = [
    200, // 0
    201, // 1
    201, // 2
    201, // 3
    204 // 4
];

const message = [
    'Success',  // 0 - 200
    'Created', // 1 - 201
    'Updated', // 2 - 201
    'Deleted', // 3 - 201
    'No content' // 4 - 204
];

Message.code = function (num) {
    return code[num];
};

Message.json = function (num, idx) {
    const json = { code: code[num], message: message[num] };

    if (idx) json.idx = idx;

    return json;
};


module.exports = Message;
