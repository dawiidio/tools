import { describe, expect, it, vi } from 'vitest';
import { Logger, LogLevel } from './Logger';

describe('Logger', () => {
    it('should extract value from string level config', async () => {
        expect(Logger.parseLogLevel('info')).toBe(4);
        expect(Logger.parseLogLevel('info|warn')).toBe(6);
        expect(Logger.parseLogLevel('info|warn|debug')).toBe(14);
        expect(Logger.parseLogLevel('error|warn|debug|info')).toBe(15);
    });

    it('should call message parser only when logLevels match', async () => {
        const logger = new Logger();

        logger.messageParser = vi.fn();
        logger.log('lorem'); // debug by default
        logger.log('ipsum', { logLevel: LogLevel.error });

        expect(logger.messageParser).toBeCalledTimes(1);
        expect(logger.messageParser).toBeCalledWith('ipsum', { logLevel: LogLevel.error });
    });

    it('should call message parser only when logLevels match and log level is set to wider range of levels', async () => {
        const logger = new Logger();

        logger.messageParser = vi.fn();
        logger.setLogLevel(LogLevel.debug | LogLevel.warn);
        logger.log('lorem'); // debug by default
        logger.log('ipsum', { logLevel: LogLevel.error });
        logger.log('dolor', { logLevel: LogLevel.warn });
        logger.log('sit', { logLevel: LogLevel.info });

        expect(logger.messageParser).toBeCalledTimes(2);
        expect(logger.messageParser).toBeCalledWith('dolor', { logLevel: LogLevel.warn });
        expect(logger.messageParser).toBeCalledWith('lorem', { logLevel: LogLevel.debug });
    });
});
