import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import routes from './Routes'

export default class NuxtServer {
// public:
	public run(): void {
		this._app.set('port', this._port);
		
		// Import API Routes
		this._app.use('/api', routes);

		// Import and Set Nuxt.js options
		let config = require('../../nuxt.config.js');
		config.dev = !(process.env.NODE_ENV === 'production');

		// Init Nuxt.js
		const nuxt = new Nuxt(config);

		// Build only in dev mode
		if (config.dev) {
			const builder = new Builder(nuxt);
			builder.build();
		}
	
		// Give nuxt middleware to express
		this._app.use(nuxt.render);

		// Listen the server
		this._app.listen(this._port, this._host);

		return;
	}
	public static getInstance(): NuxtServer {
		if(this._instance) {
			return this._instance;
		}
		else {
			this._instance = new NuxtServer();
			return this._instance;
		}
	}
// protected:
	protected constructor() {
		this._app = express();
		this._host = process.env.HOST || '127.0.0.1';
		this._port = process.env.PORT || 3000;
	}
	// Express instance
	protected _app: any;

	// Server Configuration
	protected _host: string;
	protected _port: number|string;
// private: 
	private static _instance: NuxtServer;
}