# afraid
> 😧 Afraid?! You don't need to be: Incoming data  of your express route is validated!
Type inference included!

![](https://github.com/RobinBuschmann/express-transformer/raw/master/demos/demo.gif)

## Installation
```bash
npm install afraid --save
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

### Usage with classes (optional)

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