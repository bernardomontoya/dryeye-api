import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event) => {
  let response = [];
  if (event.queryStringParameters?.doctor) {
    const params = {
      TableName: process.env.practices_table,
      FilterExpression: "#doctor = :doctor",
      ExpressionAttributeNames: {
        "#doctor": "doctor",
      },
      ExpressionAttributeValues: {
        ":doctor": event.queryStringParameters.doctor,
      },
    };
    response = await dynamoDb.scan(params);
  } else {
    const params = {
      TableName: process.env.practices_table,
    };
    response = await dynamoDb.scan(params);
  }
  const practices = response.Items;
  return practices;
}, true);
