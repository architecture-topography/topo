# 3. GraphQL as API Query Language via Apollo Server

Date: 2020-06-06

## Status

Accepted

## Context

We need a way to populate our Neo4J database via an API layer.

## Decision

Use GraphQL libraries for the server API. GraphQL has been increasing in popularity and maturity lately. It provides a more flexible API query layer compared to REST based interactions.

[Apollo Server](https://www.apollographql.com/) will be used as it's a popular well documented implementation.

## Consequences

We will need to write the API server in Javascript or similar. (We're using TypeScript)
