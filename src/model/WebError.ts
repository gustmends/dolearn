class WebError extends Error {
    public status: number;
    public data: any;
    public code: string = "custom_error";
    constructor(status: number, message?: string, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

class WebDefault extends Error {
    public status: number;
    public data: any;
    public code: string;
    constructor(code: string, data?: any, lang: string = "ptBR") {
        const { message, status } = require(`./lang/${lang}.json`)[code];
        super(message);
        this.code = code;
        this.status = status;
        this.data = data;
    }
}

export { WebError, WebDefault };