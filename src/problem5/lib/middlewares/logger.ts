import morgan from 'morgan'
import * as os from 'os'

morgan.token('hostname', () => os.hostname())
morgan.token('pid', () => process.pid.toString())

const jsonFormat = (tokens: { [x: string]: (arg0: any, arg1: any) => any }, req: any, res: any) => {
    const body = tokens['body'](req, res)
    if (body.password) {
        delete body.password
    }
    return JSON.stringify({
        remoteAddress: tokens['remote-addr'](req, res),
        method: tokens['method'](req, res),
        url: tokens['url'](req, res),
        httpVersion: tokens['http-version'](req, res),
        statusCode: tokens['status'](req, res),
        responseTime: tokens['response-time'](req, res),
        referrer: tokens['referrer'](req, res),
        userAgent: tokens['user-agent'](req, res),
        hostname: tokens['hostname'](req, res),
        pid: tokens['pid'](req, res),
    })
}

export function loggerMiddleware() {
    return morgan(jsonFormat)
}
