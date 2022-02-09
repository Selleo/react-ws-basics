# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

```
npm run init:db
```

```
npm run server
```

```
npm run ws:start
```

```
npm run start
```

## WS actions

```typescript
// types

type Message = {
  id: number;
  channelId: number;
  username: string;
  content: string;
}

type Post = {
  id: number;
  title: string;
  likes: number;
}
```

### Chat message

- onOpen
  - type: 'connect'
  - payload: { channelId: number }

- send
  - type: 'message'
  - payload: { channelId: number, username: string, content: string }

- onMessage
  - type: 'message'
  - payload: Message

### PostPreview

- onOpen
  - type: 'connect'
  - payload: { postId: number }

- send
  - type: 'incrementLike'
  - payload: { post: Post }

- onMessage
  - type: 'incrementLike'
  - payload: Post

### Chat typing

- onOpen
  - type: 'connect'
  - payload: { channelId: number }

- send
  - type: 'typing'
  - payload: { channelId: number, username: string }

- onMessage
  - type: 'typing'
  - payload: { username: string }
