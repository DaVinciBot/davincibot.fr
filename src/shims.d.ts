declare module '@supabase/phoenix/priv/static/types/timer' {
	export default class Timer {
		reset(): void;
		clear(): void;
	}
}

declare module '@supabase/phoenix/priv/static/types/types' {
	export type Vsn = string;
}

declare module '@speed-highlight/core/index' {
	export type ShjLanguageDefinition = Record<string, unknown>;
}

declare module 'svelte/internal' {
	import type { SvelteComponent } from 'svelte';
	export { SvelteComponent };
}

declare module 'sanitize-html' {
	interface TransformResult {
		tagName: string;
		attribs: Record<string, string>;
	}

	interface SanitizeHtmlOptions {
		allowedTags?: string[];
		allowedAttributes?: Record<string, string[]>;
		transformTags?: Record<
			string,
			(tagName: string, attribs: Record<string, string>) => TransformResult
		>;
	}

	interface SanitizeHtml {
		(dirty: string, options?: SanitizeHtmlOptions): string;
		defaults: {
			allowedTags: string[];
			allowedAttributes: Record<string, string[]>;
		};
		simpleTransform(tagName: string, attribs: Record<string, string>): () => TransformResult;
	}

	const sanitizeHtml: SanitizeHtml;
	export default sanitizeHtml;
}
