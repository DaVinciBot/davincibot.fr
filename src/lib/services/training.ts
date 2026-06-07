import type { RegistrationRow } from '../../database.types';

type TrainingCategory = 'code' | 'electronics' | 'robotic' | 'other' | 'software';

export type RegistrationStatus =
	| 'waitlisted'
	| 'registered'
	| 'canceled_by_user'
	| 'canceled_by_admin';

export type SlotStatus = 'draft' | 'pending' | 'done' | 'postponed' | 'canceled';

export interface TrainingListItem {
	training_id: number;
	name: string;
	description: string | null;
	prerequisites: string | null;
	category: TrainingCategory;
}

export interface TrainingSlotListItem {
	slot_id: number;
	training_id: number;
	name: string;
	description: string | null;
	prerequisites: string | null;
	category: TrainingCategory;
	start: string;
	duration_hours: number;
	on_site_seats: number | null;
	remote_seats: number | null;
	on_site_registered: number | null;
	remote_registered: number | null;
	on_site_waitlisted: number | null;
	remote_waitlisted: number | null;
	on_site_remaining: number | null;
	remote_remaining: number | null;
	location: string | null;
	video_conference_link: string | null;
	excusable: boolean;
	status: SlotStatus;
	trainer_id: string;
	trainer_username: string | null;
	trainer_avatar_url: string | null;
}

export interface RegistrationListItem {
	slot_id: number;
	member_id: string;
	date_hour: string;
	remote: boolean;
	status: RegistrationStatus;
	present: boolean | null;
	to_excuse: boolean | null;
	feedback: string | null;
	member_username: string | null;
	member_avatar_url: string | null;
}

export interface RegistrationSummary {
	remote: boolean;
	status: RegistrationStatus;
	to_excuse: boolean | null;
}

export interface CreateTrainingPayload {
	name: string;
	description?: string | null;
	prerequisites?: string | null;
	category: TrainingCategory;
}

export interface CreateTrainingSlotPayload {
	training_id: number;
	custom_name?: string | null;
	custom_description?: string | null;
	custom_prerequisites?: string | null;
	trainer_id: string;
	start: string;
	duration_hours: number;
	on_site_seats?: number | null;
	remote_seats?: number | null;
	location?: string | null;
	video_conference_link?: string | null;
	excusable: boolean;
	status: SlotStatus;
}

export interface UpdateTrainingPayload {
	name?: string;
	description?: string | null;
	prerequisites?: string | null;
	category?: TrainingCategory;
}

export interface UpdateTrainingSlotPayload {
	training_id?: number;
	custom_name?: string | null;
	custom_description?: string | null;
	custom_prerequisites?: string | null;
	trainer_id?: string;
	start?: string;
	duration_hours?: number;
	on_site_seats?: number | null;
	remote_seats?: number | null;
	location?: string | null;
	video_conference_link?: string | null;
	excusable?: boolean;
	status?: SlotStatus;
}

export interface UpdateRegistrationPayload {
	status?: RegistrationStatus;
	present?: boolean | null;
	to_excuse?: boolean | null;
	feedback?: string | null;
}

type QueryError = Error;

interface QueryResult<T> {
	data: T;
	error: QueryError | null;
}

interface FilterableQuery<T> extends PromiseLike<QueryResult<T>> {
	eq(column: string, value: string | number | boolean | null): FilterableQuery<T>;
	in(column: string, values: readonly string[]): FilterableQuery<T>;
	order(column: string, options: { ascending: boolean }): FilterableQuery<T>;
	maybeSingle(): PromiseLike<QueryResult<RegistrationRow | null>>;
}

interface MutationQuery<T> extends PromiseLike<QueryResult<T>> {
	eq(column: string, value: string | number | boolean | null): MutationQuery<T>;
	select(): SingleQuery<T>;
}

interface InsertQuery<T> {
	select(): SingleQuery<T>;
}

interface SingleQuery<T> {
	single(): PromiseLike<QueryResult<T>>;
}

interface RegistrationTable {
	select(columns: string): FilterableQuery<RegistrationRow | null>;
	update(
		payload: UpdateRegistrationPayload | Pick<RegistrationRow, 'to_excuse'>
	): MutationQuery<unknown>;
}

interface TrainerRegistrationView {
	select(columns: string): FilterableQuery<RegistrationListItem[]>;
}

interface TrainingTable {
	insert(payload: CreateTrainingPayload): InsertQuery<unknown>;
	update(payload: UpdateTrainingPayload): MutationQuery<unknown>;
}

interface TrainingSlotTable {
	insert(payload: CreateTrainingSlotPayload): InsertQuery<unknown>;
	update(payload: UpdateTrainingSlotPayload): MutationQuery<unknown>;
}

export interface TrainingSupabaseClient {
	rpc(functionName: 'training_list'): PromiseLike<QueryResult<TrainingListItem[]>>;
	rpc(
		functionName: 'training_slot_list',
		args: { p_from: string; p_to: string | null }
	): PromiseLike<QueryResult<TrainingSlotListItem[]>>;
	rpc(
		functionName: 'training_slot_detail',
		args: { p_slot_id: number }
	): PromiseLike<QueryResult<TrainingSlotListItem[]>>;
	rpc(
		functionName: 'registration_list',
		args: { p_slot_id: number }
	): FilterableQuery<RegistrationListItem[]>;
	rpc(
		functionName: 'register_to_slot',
		args: { p_slot_id: number; p_remote: boolean; p_to_excuse: boolean }
	): PromiseLike<QueryResult<RegistrationStatus>>;
	rpc(
		functionName: 'cancel_my_registration',
		args: { p_slot_id: number }
	): PromiseLike<QueryResult<unknown>>;
	rpc(
		functionName: 'trainer_update_presence',
		args: { p_slot_id: number; p_member_id: string; p_present: boolean | null }
	): PromiseLike<QueryResult<unknown>>;
	from(table: 'registration'): RegistrationTable;
	from(table: 'trainer_registration_view'): TrainerRegistrationView;
	from(table: 'training'): TrainingTable;
	from(table: 'training_slot'): TrainingSlotTable;
}

export async function getTrainingList(
	supabase: TrainingSupabaseClient
): Promise<TrainingListItem[]> {
	const { data, error } = await supabase.rpc('training_list');
	if (error) {
		throw error;
	}
	return data;
}

export async function getTrainingSlots(
	supabase: TrainingSupabaseClient,
	fromDate = new Date(),
	number_of_days: number | null = null
): Promise<TrainingSlotListItem[]> {
	const { data, error } = await supabase.rpc('training_slot_list', {
		p_from: fromDate.toISOString(),
		p_to:
			number_of_days === null
				? null
				: new Date(fromDate.getTime() + number_of_days * 24 * 60 * 60 * 1000).toISOString()
	});
	if (error) {
		throw error;
	}
	return data;
}

export async function getTrainingSlotDetail(
	supabase: TrainingSupabaseClient,
	slotId: number
): Promise<TrainingSlotListItem | null> {
	const { data, error } = await supabase.rpc('training_slot_detail', {
		p_slot_id: slotId
	});
	if (error) {
		throw error;
	}
	return data[0] ?? null;
}

export async function getSlotRegistrations(
	supabase: TrainingSupabaseClient,
	slotId: number
): Promise<RegistrationListItem[]> {
	const { data, error } = await supabase
		.rpc('registration_list', {
			p_slot_id: slotId
		})
		.in('status', ['registered', 'waitlisted']);
	if (error) {
		throw error;
	}
	return data;
}

export async function getTrainerSlotRegistrations(
	supabase: TrainingSupabaseClient,
	slotId: number
): Promise<RegistrationListItem[]> {
	const { data, error } = await supabase
		.from('trainer_registration_view')
		.select(
			'slot_id,member_id,date_hour,remote,status,present,to_excuse,feedback,member_username,member_avatar_url'
		)
		.eq('slot_id', slotId)
		.in('status', ['registered', 'waitlisted'])
		.order('date_hour', { ascending: true });
	if (error) {
		throw error;
	}
	return data;
}

export async function getMyRegistrationForSlot(
	supabase: TrainingSupabaseClient,
	slotId: number,
	userId: string | null
): Promise<RegistrationSummary | null> {
	if (!userId) {
		return null;
	}

	const { data, error } = await supabase
		.from('registration')
		.select('*')
		.eq('slot_id', slotId)
		.eq('member_id', userId)
		.maybeSingle();
	if (error) {
		throw error;
	}
	if (data === null) {
		return null;
	}
	if (data.status !== 'registered' && data.status !== 'waitlisted') {
		return null;
	}
	return {
		remote: data.remote,
		status: data.status,
		to_excuse: data.to_excuse
	};
}

export async function registerToSlot(
	supabase: TrainingSupabaseClient,
	slotId: number,
	remote: boolean,
	toExcuse = false
): Promise<RegistrationStatus> {
	const { data, error } = await supabase.rpc('register_to_slot', {
		p_slot_id: slotId,
		p_remote: remote,
		p_to_excuse: toExcuse
	});
	if (error) {
		throw error;
	}
	return data;
}

export async function cancelRegistration(
	supabase: TrainingSupabaseClient,
	slotId: number
): Promise<unknown> {
	const { data, error } = await supabase.rpc('cancel_my_registration', {
		p_slot_id: slotId
	});
	if (error) {
		throw error;
	}
	return data;
}

export async function updateMyRegistrationExcuse(
	supabase: TrainingSupabaseClient,
	slotId: number,
	toExcuse: boolean,
	userId: string | null
): Promise<unknown> {
	if (!userId) {
		throw new Error('User not authenticated');
	}

	const { data, error } = await supabase
		.from('registration')
		.update({ to_excuse: toExcuse })
		.eq('slot_id', slotId)
		.eq('member_id', userId);
	if (error) {
		throw error;
	}
	return data;
}

export async function updateRegistration(
	supabase: TrainingSupabaseClient,
	slotId: number,
	memberId: string,
	updates: UpdateRegistrationPayload
): Promise<unknown> {
	const { data, error } = await supabase
		.from('registration')
		.update(updates)
		.eq('slot_id', slotId)
		.eq('member_id', memberId);
	if (error) {
		throw error;
	}
	return data;
}

export async function updateTrainerPresence(
	supabase: TrainingSupabaseClient,
	slotId: number,
	memberId: string,
	present: boolean | null
): Promise<unknown> {
	const { data, error } = await supabase.rpc('trainer_update_presence', {
		p_slot_id: slotId,
		p_member_id: memberId,
		p_present: present
	});
	if (error) {
		throw error;
	}
	return data;
}

export async function createTraining(
	supabase: TrainingSupabaseClient,
	payload: CreateTrainingPayload
): Promise<unknown> {
	const { data, error } = await supabase.from('training').insert(payload).select().single();
	if (error) {
		throw error;
	}
	return data;
}

export async function updateTraining(
	supabase: TrainingSupabaseClient,
	trainingId: number,
	updates: UpdateTrainingPayload
): Promise<unknown> {
	const { data, error } = await supabase
		.from('training')
		.update(updates)
		.eq('id', trainingId)
		.select()
		.single();
	if (error) {
		throw error;
	}
	return data;
}

export async function createTrainingSlot(
	supabase: TrainingSupabaseClient,
	payload: CreateTrainingSlotPayload
): Promise<unknown> {
	const { data, error } = await supabase.from('training_slot').insert(payload).select().single();
	if (error) {
		throw error;
	}
	return data;
}

export async function updateTrainingSlot(
	supabase: TrainingSupabaseClient,
	slotId: number,
	updates: UpdateTrainingSlotPayload
): Promise<unknown> {
	const { data, error } = await supabase
		.from('training_slot')
		.update(updates)
		.eq('id', slotId)
		.select()
		.single();
	if (error) {
		throw error;
	}
	return data;
}
