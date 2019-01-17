# 1. GraphQL as query language and Neo4j as the database

Date: 2019-01-07

## Status

Accepted

## Context

* The method of representing relationships in a GraphQL database is well suited to suit TOPO datasets. 
* Neo4j was used because at the time of writing it is the most-widely used and documented graph database management tool. 

## Decision

* GraphQL as the query language
* Neo4j as the database.

## Consequences

* The project is cloud provider agnostic, which is a constraint of this project (should able to be run easily on any cloud provider instance).
