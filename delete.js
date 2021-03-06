import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const { patient, user } = event.queryStringParameters;

  const params = {
    TableName: process.env.patients_table,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      patient,
      user,
    },
  };

  await dynamoDb.delete(params);

  return { status: 200 };
});
