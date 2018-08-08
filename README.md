# express-transformer
An express middleware for validating incoming data with type inference.
(This library uses express-validator under the hood)

![alt text](https://github.com/RobinBuschmann/express-transformer/tree/master/demos/et-demo-1)
![alt text](https://github.com/RobinBuschmann/express-transformer/tree/master/demos/et-demo-2)

## Installation
```bash
npm install express-transformer --save
```

### Usage with class-transformer / class-validator

![alt text](https://github.com/RobinBuschmann/express-transformer/tree/master/demos/et-demo-3)

*class-transformer* and *class-validator* are requiring [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
```
npm intall class-transformer --save
npm intall class-validator --save
npm install reflect-metadata --save
```
and the following flags in `tsconfig.json`:
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

## Getting started
```typescript
import * as express from 'express';

const app = express();

app.get('/users', [
    query('limit').int(),
    query('offset').int(),
    query('filters').string().array().opt(),
    fail,
], (req, res, next) => {
    // ...
});
```