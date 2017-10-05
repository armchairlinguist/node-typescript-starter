import { Logger as WinLogger } from 'winston';
import { LoggerInstance, transports } from 'winston';
import * as winstonPT from 'winston-papertrail';

class Logger {
	private logger: LoggerInstance;

	constructor() {
		this.logger = (process.env.PAPER_TRAIL_ENABLED === 'true') ? this.paperTrailLogger() : this.consoleLogger();
		this.logger.level = process.env.LOG_LEVEL;
  }

	public debug(message: string): void {
		this.logger.debug(message);
	}

	public info(message: string): void {
		this.logger.info(message);
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public error(message: string): void {
		this.logger.error(message);
	}

	private paperTrailLogger(): LoggerInstance {
		let ptTransport = new winstonPT.Papertrail({
			host: 'logsN.papertrailapp.com',//process.env.PAPER_TRAIL_HOST,
			port: XXXXX,//process.env.PAPER_TRAIL_PORT,
			program: require.main.filename,
			level: process.env.LOG_LEVEL
		});

		ptTransport.on('error', (err) => {
			debugger;
			this.logger = this.consoleLogger(); // Switch to console - consider sending an alarm
			this.logger.error('Cannot connect to papertrail.  Switching to console');
			this.logger.error(err);
		});

		return new WinLogger({ transports: [ ptTransport ] });
	}

	private consoleLogger(): LoggerInstance {
		let transport = new transports.Console({
			level: process.env.LOG_LEVEL
		});

		return new WinLogger({ transports: [ transport ] });
	}
}

const log = new Logger();
export default log;