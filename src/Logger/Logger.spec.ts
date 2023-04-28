import { describe, expect, it, vi } from 'vitest';
import { ILogAttributes, Logger, LogLevel } from './Logger';

describe('Logger', () => {
    const getEnhancedLogger = () => {
        const spyFn = vi.fn();

        class EnhancedLogger extends Logger {
            parseMessage(message: string, attrs: Partial<ILogAttributes>): string {
                spyFn(message, attrs);
                return super.parseMessage(message, attrs);
            }
        }

        return {
            EnhancedLogger,
            spyFn,
        }
    };

    it('should extract value from string level config', async () => {
        expect(Logger.parseLogLevel('info')).toBe(4);
        expect(Logger.parseLogLevel('info|warn')).toBe(6);
        expect(Logger.parseLogLevel('info|warn|debug')).toBe(14);
        expect(Logger.parseLogLevel('error|warn|debug|info')).toBe(15);
    });

    it('should call message parser only when logLevels match', async () => {
        const { EnhancedLogger, spyFn } = getEnhancedLogger();
        const logger = new EnhancedLogger();

        logger.log('lorem'); // debug by default
        logger.log('ipsum', { logLevel: LogLevel.error });

        expect(spyFn).toBeCalledTimes(1);
        expect(spyFn).toBeCalledWith('ipsum', { logLevel: LogLevel.error });
    });

    it('should call message parser only when logLevels match and log level is set to wider range of levels', async () => {
        const { EnhancedLogger, spyFn } = getEnhancedLogger();
        const logger = new EnhancedLogger();

        logger.setLogLevel(LogLevel.debug | LogLevel.warn);
        logger.log('lorem'); // debug by default
        logger.log('ipsum', { logLevel: LogLevel.error });
        logger.log('dolor', { logLevel: LogLevel.warn });
        logger.log('sit', { logLevel: LogLevel.info });

        expect(spyFn).toBeCalledTimes(2);
        expect(spyFn).toBeCalledWith('dolor', { logLevel: LogLevel.warn });
        expect(spyFn).toBeCalledWith('lorem', { logLevel: LogLevel.debug });
    });
});
