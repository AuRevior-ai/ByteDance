# API Documentation

Base URL: `http://localhost:3001/api`

## Conversation API

```text
POST   /conversations
GET    /conversations
GET    /conversations/:id
PATCH  /conversations/:id
DELETE /conversations/:id
```

## Message API

```text
GET    /conversations/:id/messages
POST   /conversations/:id/messages
POST   /messages/:id/regenerate
POST   /messages/:id/pin
```

## Agent API

```text
GET    /agents
POST   /agents
GET    /agents/:id
PATCH  /agents/:id
DELETE /agents/:id
```

## Orchestrator API

```text
POST   /orchestrator/plan
POST   /orchestrator/run
GET    /traces/:id
```

## Artifact API

```text
GET    /artifacts/:id
PATCH  /artifacts/:id
POST   /artifacts/:id/apply-diff
GET    /artifacts/:id/versions
POST   /artifacts/:id/export
```

## Deployment API

```text
POST   /deployments
GET    /deployments/:id
```

