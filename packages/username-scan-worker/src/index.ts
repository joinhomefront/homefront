import { z } from 'zod';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

enum Platforms {
	TWITTER = 'Twitter',
	INSTAGRAM = 'Instagram',
	GMAIL = 'Gmail',
	PINTEREST = 'Pinterest',
	TUMBLR = 'Tumblr',
	GITHUB = 'GitHub',
	GITLAB = 'GitLab',
	REDDIT = 'Reddit',
}

interface PlatformResponse {
	platform: Platforms;
	available: boolean;
	message: string;
	link?: string;
}

abstract class UsernameQueryable {
	abstract checkUsername(username: string): Promise<PlatformResponse>;
}

abstract class EmailQueryable {
	abstract checkEmail(email: string): Promise<PlatformResponse>;
}

abstract class PrerequestRequired {
	abstract prerequest(): Promise<void>;
}

interface TwitterJsonResponse {
	valid: boolean;
	desc: string;
}

interface InstagramJsonResponse {
	username_available: boolean;
	errors: { username: string[] };
}

class BasePlatform {
	DEFAULT_HEADERS = {
		'User-Agent':
			'Mozilla/5.0 (Linux; Android 8.1.0; motorola one Build/OPKS28.63-18-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 Instagram 72.0.0.21.98 Android (27/8.1.0; 320dpi; 720x1362; motorola; motorola one; deen_sprout; qcom; pt_BR; 132081645)',
		Accept: '*/*',
		'Accept-Language': 'en-US,en;q=0.9',
	};

	async getJson<T>(response: Response): Promise<T> {
		if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
			throw new Error(`Unexpected content type ${response.headers.get('Content-Type')}`);
		}
		return response.json();
	}

	async getText(response: Response): Promise<string> {
		return response.text();
	}

	async fetchWithHeaders(url: string, options: RequestInit = {}): Promise<Response> {
		const headers = { ...this.DEFAULT_HEADERS, ...options.headers };
		return fetch(url, { ...options, headers });
	}
}

class Twitter extends BasePlatform implements UsernameQueryable {
	USERNAME_ENDPOINT = 'https://api.twitter.com/i/users/username_available.json';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const url = `${this.USERNAME_ENDPOINT}?username=${username}`;
		const response = await this.fetchWithHeaders(url, { method: 'GET' });
		const data = await this.getJson<TwitterJsonResponse>(response);

		if (data.valid) {
			return { platform: Platforms.TWITTER, available: true, message: 'Available' };
		}
		return { platform: Platforms.TWITTER, available: false, message: data.desc };
	}
}

class GitHub extends BasePlatform implements UsernameQueryable, EmailQueryable, PrerequestRequired {
	URL = 'https://github.com/signup';
	USERNAME_ENDPOINT = 'https://github.com/signup_check/username';
	EMAIL_ENDPOINT = 'https://github.com/signup_check/email';
	USERNAME_TAKEN_MSGS = ['already taken', 'unavailable', 'not available'];
	USERNAME_LINK_FORMAT = 'https://github.com/{}';

	tokenRegex = /<input type="hidden" data-csrf="true" name="authenticity_token" value="([^"]+)"/;
	tagRegex = /<[^>]+>/;

	private authenticityToken: string | null = null;

	async prerequest(): Promise<void> {
		const response = await this.fetchWithHeaders(this.URL, { method: 'GET' });
		const text = await this.getText(response);
		const match = this.tokenRegex.exec(text);
		if (match) {
			this.authenticityToken = match[1] ?? null;
		} else {
			throw new Error('Failed to retrieve tokens');
		}
	}

	async checkUsername(username: string): Promise<PlatformResponse> {
		const response = await this.fetchWithHeaders(`${this.USERNAME_ENDPOINT}?value=${username}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.status === 422) {
			let text = await this.getText(response);
			text = this.tagRegex.test(text) ? text.replace(this.tagRegex, '').trim() : text;

			// Extract the message inside the .mb-1 class (the username availability message)
			const messageMatch = text.match(/<div class="mb-1">([^<]+)<\/div>/);
			const message = messageMatch?.[1]?.trim() ?? 'Unknown error';

			// Check if the username is unavailable by looking for specific keywords
			const isUnavailable = this.USERNAME_TAKEN_MSGS.some((msg) => message.includes(msg));
			const unavailableMessage = isUnavailable ? message : 'Invalid username';

			return {
				platform: Platforms.GITHUB,
				available: !isUnavailable,
				message: unavailableMessage,
			};
		}
		if (response.status === 200) {
			return { platform: Platforms.GITHUB, available: true, message: 'Available' };
		}
		if (response.status === 429) {
			return { platform: Platforms.GITHUB, available: false, message: 'Too many requests' };
		}
		throw new Error('Unexpected response status');
	}

	async checkEmail(email: string): Promise<PlatformResponse> {
		if (!this.authenticityToken) {
			await this.prerequest();
		}
		const response = await this.fetchWithHeaders(this.EMAIL_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({ value: email, authenticity_token: this.authenticityToken }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.status === 422) {
			const text = await this.getText(response);
			return { platform: Platforms.GITHUB, available: false, message: text };
		}
		if (response.status === 200) {
			return { platform: Platforms.GITHUB, available: true, message: 'Available' };
		}
		if (response.status === 429) {
			return { platform: Platforms.GITHUB, available: false, message: 'Too many requests' };
		}
		throw new Error('Unexpected response status');
	}
}

class Instagram extends BasePlatform implements UsernameQueryable {
	USERNAME_ENDPOINT = 'https://www.instagram.com/accounts/web_create_ajax/attempt/';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const url = this.USERNAME_ENDPOINT;
		const response = await this.fetchWithHeaders(url, {
			method: 'POST',
			body: JSON.stringify({ username }),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await this.getJson<InstagramJsonResponse>(response);

		if (data.username_available) {
			return { platform: Platforms.INSTAGRAM, available: true, message: 'Available' };
		}
		return { platform: Platforms.INSTAGRAM, available: false, message: data.errors.username[0] ?? 'Unknown error' };
	}
}

class Gmail extends BasePlatform implements EmailQueryable {
	EMAIL_ENDPOINT = 'https://mail.google.com/mail/gxlu?email=';

	async checkEmail(email: string): Promise<PlatformResponse> {
		const url = `${this.EMAIL_ENDPOINT}${email}`;
		const response = await this.fetchWithHeaders(url, { method: 'GET' });

		if (response.status === 200) {
			return { platform: Platforms.GMAIL, available: false, message: 'Unavailable' };
		}
		return { platform: Platforms.GMAIL, available: true, message: 'Available' };
	}
}

class Pinterest extends BasePlatform implements UsernameQueryable {
	USERNAME_ENDPOINT = 'https://www.pinterest.com/';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const url = `${this.USERNAME_ENDPOINT}${username}`;
		const response = await this.fetchWithHeaders(url, { method: 'GET' });

		if (response.status === 200) {
			const text = await this.getText(response);

			if (text.includes('User not found.')) {
				return { platform: Platforms.PINTEREST, available: true, message: 'Available' };
			}
			return { platform: Platforms.PINTEREST, available: false, message: 'Unavailable' };
		}
		throw new Error('Unexpected response status');
	}
}
class Tumblr extends BasePlatform implements UsernameQueryable {
	USERNAME_ENDPOINT = 'https://www.tumblr.com/';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const url = `${this.USERNAME_ENDPOINT}${username}`;
		const response = await this.fetchWithHeaders(url, { method: 'GET' });

		if (response.status === 200) {
			return { platform: Platforms.TUMBLR, available: false, message: 'Unavailable' };
		}
		return { platform: Platforms.TUMBLR, available: true, message: 'Available' };
	}
}

class GitLab extends BasePlatform implements UsernameQueryable {
	USERNAME_ENDPOINT = 'https://gitlab.com/users/';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const url = `${this.USERNAME_ENDPOINT}${username}`;
		const response = await this.fetchWithHeaders(url, { method: 'GET' });

		if (response.status === 200) {
			return { platform: Platforms.GITLAB, available: false, message: 'Unavailable' };
		}
		return { platform: Platforms.GITLAB, available: true, message: 'Available' };
	}
}

class Reddit extends BasePlatform implements UsernameQueryable {
	URL = 'https://reddit.com';
	ENDPOINT = 'https://www.reddit.com/api/username_available.json?user=';
	USERNAME_TAKEN_MSGS = ['Invalid username', 'that username is already taken', 'that username is taken by a deleted account'];
	USERNAME_LINK_FORMAT = 'https://www.reddit.com/u/{}';

	async checkUsername(username: string): Promise<PlatformResponse> {
		const response = await this.fetchWithHeaders(`${this.ENDPOINT}${username}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'User-Agent': this.DEFAULT_HEADERS['User-Agent'] },
		});

		const isAvailable: boolean = await this.getJson(response);

		if (isAvailable === true) {
			return { platform: Platforms.REDDIT, available: true, message: 'Available' };
		}
		if (isAvailable === false) {
			return { platform: Platforms.REDDIT, available: false, message: 'Unavailable' };
		}
		throw new Error('Unexpected response status');
	}
}
const PLATFORM_CLASSES: Record<Platforms, new () => UsernameQueryable | EmailQueryable> = {
	[Platforms.TWITTER]: Twitter,
	[Platforms.GITHUB]: GitHub,
	[Platforms.INSTAGRAM]: Instagram,
	[Platforms.GMAIL]: Gmail,
	[Platforms.PINTEREST]: Pinterest,
	[Platforms.TUMBLR]: Tumblr,
	[Platforms.GITLAB]: GitLab,
	[Platforms.REDDIT]: Reddit,
};

const fetchUsernameData = async (username: string, platforms: Platforms[]): Promise<PlatformResponse[]> => {
	const responses: PlatformResponse[] = await Promise.all(
		platforms.map(async (platform) => {
			const PlatformClass = PLATFORM_CLASSES[platform];
			const platformInstance = new PlatformClass();
			if ('checkUsername' in platformInstance) {
				return platformInstance.checkUsername(username);
			}
			return {
				platform,
				available: false,
				message: 'Platform does not support username queries',
			};
		}),
	);

	return responses;
};

const fetchEmailData = async (email: string, platforms: Platforms[]): Promise<PlatformResponse[]> => {
	const responses: PlatformResponse[] = await Promise.all(
		platforms.map(async (platform) => {
			const PlatformClass = PLATFORM_CLASSES[platform];
			const platformInstance = new PlatformClass();
			if ('checkEmail' in platformInstance) {
				return platformInstance.checkEmail(email);
			}
			return {
				platform,
				available: false,
				message: 'Platform does not support email queries',
			};
		}),
	);

	return responses;
};

export default {
	async fetch(request: Request): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		try {
			const { username, email } = (await request.json()) as { username?: string; email?: string };

			if (username && (!username.trim() || typeof username !== 'string')) {
				return new Response(JSON.stringify({ error: 'Username must be a non-empty string' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			if (email && (!email.trim() || typeof email !== 'string')) {
				return new Response(JSON.stringify({ error: 'Email must be a non-empty string' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const platforms = [
				Platforms.TWITTER,
				Platforms.GITHUB,
				// Platforms.INSTAGRAM,
				// Platforms.GMAIL,
				Platforms.PINTEREST,
				Platforms.TUMBLR,
				Platforms.GITLAB,
				Platforms.REDDIT,
			];

			let results: PlatformResponse[] = [];

			if (username) {
				results = await fetchUsernameData(username, platforms);
			}

			if (email) {
				results = await fetchEmailData(email, platforms);
			}

			return new Response(JSON.stringify(results), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: unknown) {
			console.error('Error:', error);
			return new Response(JSON.stringify({ error: (error as Error).message || 'Unknown error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies ExportedHandler<Env>;
