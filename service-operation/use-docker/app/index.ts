import express, { Request, Response } from 'express';

const app = express();

type User = {
  name: string;
  age: number;
  country: string;
};

app.get('/users', (request: Request, response: Response) => {
  const users: Array<User> = [
    {
      name: 'personA',
      age: 20,
      country: 'Japan',
    },
    {
      name: 'personB',
      age: 21,
      country: 'USA',
    },
    {
      name: 'personC',
      age: 22,
      country: 'UK',
    },
  ];
  response.send(users);
});

app.listen(3030, () => {
  console.log('server running at port 3030');
});
