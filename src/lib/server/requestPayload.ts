export const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

export const readJsonRecord = async (request: Request): Promise<Record<string, unknown> | null> => {
	const parsed: unknown = await request.json();
	return isRecord(parsed) ? parsed : null;
};

export const readOptionalString = (
	record: Record<string, unknown>,
	key: string
): string | undefined => {
	const value = record[key];
	return typeof value === 'string' ? value : undefined;
};

export const readOptionalNumber = (
	record: Record<string, unknown>,
	key: string
): number | undefined => {
	const value = record[key];
	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : undefined;
	}

	if (typeof value === 'string' && value.trim()) {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : undefined;
	}

	return undefined;
};
