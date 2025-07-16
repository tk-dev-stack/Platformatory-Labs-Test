import { Connection } from '@temporalio/client';

(async () => {
  try {
    const connection = await Connection.connect({ address: 'localhost:7233',connectTimeout: 10000 });
    console.log('Temporal connected successfully!');
  } catch (err) {
    console.error('Temporal connection failed:', err.message);
  }
})();
