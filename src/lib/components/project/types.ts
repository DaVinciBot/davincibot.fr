/**
 * Vocabulaire commun aux pages projet (`/project/*`).
 *
 * Les trois pages racontent la même histoire dans le même ordre — héros,
 * chiffres, mission, capacités, équipe, feuille de route, appel — et ne
 * diffèrent que par leur contenu. Ces types fixent la forme de ce contenu pour
 * que les composants de `$lib/components/project` restent interchangeables.
 */

/** Un chiffre mis en avant, avec la phrase qui lui donne son sens. */
export interface ProjectFigure {
	value: string;
	label: string;
	description?: string;
}

/**
 * Un bloc de contenu carte : un titre, puis au choix un paragraphe, une liste
 * de points, ou les deux.
 */
export interface ProjectFeature {
	title: string;
	description?: string;
	points?: string[];
}

/** Une étape datée de la feuille de route. */
export interface ProjectMilestone {
	period: string;
	title: string;
	description: string;
}

/** Un bouton d'appel à l'action. */
export interface ProjectAction {
	label: string;
	href: string;
	variant?: 'primary' | 'secondary';
}
