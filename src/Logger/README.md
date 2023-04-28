# Logger
Part of **@dawiidio/tools** package

Simple logger which uses bitmasks for logging levels

## Usage

```ts
import { Logger, LogLevel } from '@dawiidio/tools/lib/node/Logger/Logger';

export const logger = new Logger();
```

later in code:

```ts
import { logger } from './somewhere';
import { Logger, LogLevel } from '@dawiidio/tools/lib/node/Logger/Logger';

logger.log('Hello world!');
logger.log('Hello world!', {
    logLevel: LogLevel.error,
});
logger.log('Hello world!', {
    logLevel: LogLevel.warn,
});
```

configuration of log level

```ts
import { logger } from './somewhere';

// set log level to only error
logger.setLogLevel(LogLevel.error);
// set log level to error and warn
logger.setLogLevel(LogLevel.error | LogLevel.warn);
// set log level to all
logger.setLogLevel(LogLevel.error | LogLevel.warn | LogLevel.info | LogLevel.debug);
```

or you can extract log level from string

```ts
import { Logger, LogLevel, ILoggerConfigString } from '@dawiidio/tools/lib/node/Logger/Logger';
import { logger } from './somewhere';

// same as LogLevel.error | LogLevel.warn | LogLevel.info | LogLevel.debug
const logLevel: ILoggerConfigString = 'error|warn|info|debug';

logger.setLogLevel(Logger.parseLogLevel(logLevel));
```


## Examples

You can easily enhance your logger with method per level, like this:

```ts
import { Logger, LogLevel } from '@dawiidio/tools/lib/node/Logger/Logger';

class EnhancedLogger extends Logger {

    error(...args: any[]) {
        this.log(this.stringifyArgs(args), {
            logLevel: LogLevel.error,
        });
    }

    debug(...args: any[]) {
        this.log(this.stringifyArgs(args));
    }

    warn(...args: any[]) {
        this.log(this.stringifyArgs(args), {
            logLevel: LogLevel.warn,
        });
    }

    info(...args: any[]) {
        this.log(this.stringifyArgs(args), {
            logLevel: LogLevel.info,
        });
    }

    private stringifyArgs(args: any[]): string {
        return args.map((val) => JSON.stringify(val).replaceAll('"', '')).join(' ');
    }
}

export const logger = new EnhancedLogger();
```
