# express-transformer
An express middleware for validating incoming data with type inference.

## Installation
```bash
npm install <package-name> --save
```

## Getting started
```typescript
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

### Usage with classes

![](https://github.com/RobinBuschmann/express-transformer/raw/master/demos/et-demo-3.gif)

*class-transformer* are requiring [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
```
npm intall class-transformer --save
npm install reflect-metadata --save
```
and the following flags in `tsconfig.json`:
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```