import express, { Request, Response } from 'express';
import { ParseRequest, StringifyRequest, DateString } from './types';
import { parse } from './parse';
import { stringify } from './stringify';

const PORT: number = parseInt(process.env.PORT as string) || 1337

const app = express()

app.use(express.json());

app.post('/parse', async (request: Request, response: Response) => {
    try {
        const parseRequest: ParseRequest = request.body;

        const res: Date | Error = parse(parseRequest.dateString)

        response.status(200).json(res)
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json(error.message)
        }
    }
})

app.post('/stringify', async (request: Request, response: Response) => {
    try {
        const stringifyRequest: StringifyRequest = request.body;

        const res: DateString | Error = stringify(new Date(stringifyRequest.date))

        response.status(200).json(res)
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json(error.message)
        }
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });