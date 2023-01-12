import { app } from '../src/app';

import request from 'supertest';
import { IUser } from '../src/interfaces/user.interface';
import { getMetaData } from '../src/helpers/database';
import { IMetadata } from '../src/interfaces/metadata.interface';

describe('POST /user', () => {
  it('add User, returns 201 created and adds a user successfully', async () => {
    const metadata: IMetadata = await getMetaData();
    const currentUserID = metadata.user;

    const correctPayload: IUser = {
      Name: 'George',
      LastName: 'Test',
      Birthday: new Date('2020-12-04'),
      Email: 'george@test.com',
      Password: '1234',
    };
    const res = await request(app).post('/user').send(correctPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.ID).toBe(currentUserID + 1);
  });

  it('add User, returns 400 Bad Request and does not a user', async () => {
    const metadata: IMetadata = await getMetaData();

    const wrongPayload: IUser = {
      Name: 'George',
      LastName: 'Test',
      Birthday: new Date('2020-12-04'),
      Email: 'george.com',
      Password: '1234',
    };
    const res = await request(app).post('/user').send(wrongPayload);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].attribute).toBe('Email');
  });
});
