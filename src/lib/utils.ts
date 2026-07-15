import { userdata, type UserData } from '$lib/store';

// Types du contrat hôte : les composants du submodule (modals) les importent.
export type CloseEvent = Event | Element | null;
export type CloseHandler = (event: CloseEvent) => void;

export function loadUserdata(userFromServer: UserData = null) {
	userdata.set(userFromServer);
}

export function loadSettings(key: string): unknown {
	try {
		return JSON.parse(window.localStorage.getItem(`settings_${key}`) ?? '[]');
	} catch {
		return undefined;
	}
}

export function saveSettings(key: string, settings: unknown) {
	try {
		localStorage.setItem(`settings_${key}`, JSON.stringify(settings));
	} catch {
		return undefined;
	}
}

export function hashCode(obj: unknown) {
	const str = JSON.stringify(obj);
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		const chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
}

export function hideOnClickOutside(
	element: HTMLElement,
	destroyHandler: (element: HTMLElement) => void = (el) => {
		el.classList.toggle('hidden');
	},
	permanent = false
) {
	const outsideClickListener = (event: MouseEvent) => {
		if (!(event.target instanceof Node)) {
			return;
		}
		if (!element.contains(event.target) && isVisible(element)) {
			destroyHandler(element);
			if (!permanent) {
				removeClickListener();
			}
		}
	};

	const removeClickListener = () => {
		document.removeEventListener('click', outsideClickListener);
	};

	document.addEventListener('click', outsideClickListener);
}

function isVisible(elem: HTMLElement) {
	return Boolean(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}
