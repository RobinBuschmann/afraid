[![NPM](https://img.shields.io/npm/v/afraid.svg)](https://www.npmjs.com/package/afraid)
[![Build Status](https://travis-ci.org/RobinBuschmann/afraid.svg?branch=master)](https://travis-ci.org/RobinBuschmann/afraid)

# afraid
> 😧 Afraid?! You don't need to be: Incoming data  of your express route is validated!
Type inference included!

![](https://github.com/RobinBuschmann/afraid/raw/master/demos/demo.gif)

## Installation
```bash
npm install afraid --save --no-optional
```

## Usage
```typescript
import {query, f, fail} from 'afraid';
import * as express from 'express';

const app = express();

app.get('/users', [
    query(
        f('limit').int(),
        f('offset').int(),
        f('filters').string().array().opt(),
    ),
    fail,
], (req, res, next) => {
    // ...
});
```

## Using classes for validation and transformation (optional)

#### Installation
Omitting `--no-optional` will install required packages `class-transformer` and `reflect-metadata` automatically
```
npm install afraid --save 
```
#### Configuration
The following flags in `tsconfig.json`:
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

#### Usage
```typescript
import {query, Field, IsInt, fail} from 'afraid'
import * as express from 'express';

const app = express();

class UserDTO {
    @Field name: string;
    @IsInt() @Field age: number;
}

app.post('/users', [
    body(UserDTO),
    fail,
], (req, res, next) => {
    // ...
});
```
