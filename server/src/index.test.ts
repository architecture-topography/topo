import { createTestClient } from "apollo-server-testing";
import server from "./server";

it("should return hello", async () => {
  const expectedResponse = {
    hello: "Hello, Topo"
  };

  const { query } = createTestClient(server);

  const response = await query({ query: "query { hello }" });

  expect(response.data).toEqual(expectedResponse);
});
