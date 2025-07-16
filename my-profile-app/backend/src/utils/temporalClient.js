// backend/src/utils/temporalClient.js
import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';

let client;

export async function triggerUpdateProfileWorkflow(data) {
  if (!client) {
    const connection = await Connection.connect({ address: 'localhost:7233',connectTimeout: 10000 });
    client = new Client({ connection });
  }

  const handle = await client.workflow.start('updateProfileWorkflow', {
    taskQueue: 'hello-world',
    workflowId: 'update-profile-' + nanoid(),
    args: [data],
  });

  console.log(`Temporal workflow started: ${handle.workflowId}`);
}
