import { getMetaData } from '../src/helpers/database';
import { IMetadata } from '../src/interfaces/metadata.interface';
import { app } from '../src/app';

import request from 'supertest';

describe('GET /purchase', () => {
  it('get Purchase, returns 200 and list of purchases', async () => {
    const metadata: IMetadata = await getMetaData();
    const purchaseCount = metadata.purchase;

    const res = await request(app).get('/purchase');

    expect(res.statusCode).toBe(200);
    expect(res.body.purchases.length).toBe(purchaseCount);
  });
});
