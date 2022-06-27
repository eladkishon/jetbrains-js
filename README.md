
# [Jetbrains JS](https://www.npmjs.com/package/jetbrains-js)


## Installation

```bash
npm install jetbrains-js
```

## Usage


Save a nodejs run configuration
```js
import { WebstormRunConfiguration } from 'jetbrains-js';

WebstormRunConfiguration.saveNodeJsConfig(
{
    name: 'My Node.js project',
    args: ['--some-arg', '--another-arg'],
    filePath: '/path/to/my/project/index.js',
    workingDir: '/path/to/my/project',
    env: {
        NODE_ENV: 'development',
    }
})
```


Save an NPM run script configuration
```js
import { WebstormRunConfiguration } from 'jetbrains-js';
WebstormRunConfiguration.saveNpmConfig(
    {
        packageJsonPath: '/path/to/my/project/package.json',
        env: {
            NODE_ENV: 'development',
        }
    }
)
```


