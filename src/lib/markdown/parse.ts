import remarkParse from 'remark-parse';
import { unified } from 'unified';

export interface MarkdownNode {
	type: string;
	children?: MarkdownNode[];
	[key: string]: unknown;
}

export interface MarkdownRoot extends MarkdownNode {
	type: 'root';
	children: MarkdownNode[];
}

export function parseMarkdownToAst(markdown: string | null | undefined): MarkdownRoot {
	const processor = unified().use(remarkParse);
	const tree = processor.parse(markdown ?? '') as MarkdownRoot;
	const newChildren: MarkdownNode[] = [];

	for (const node of tree.children) {
		if (node.type !== 'paragraph') {
			newChildren.push(node);
			continue;
		}

		const children = node.children ?? [];
		const hasImage = children.some((child) => child.type === 'image');
		if (!hasImage) {
			newChildren.push(node);
			continue;
		}

		let currentParagraphChildren: MarkdownNode[] = [];

		for (const child of children) {
			if (child.type === 'image') {
				if (currentParagraphChildren.length > 0) {
					newChildren.push({
						type: 'paragraph',
						children: currentParagraphChildren
					});
					currentParagraphChildren = [];
				}
				newChildren.push(child);
			} else {
				currentParagraphChildren.push(child);
			}
		}

		if (currentParagraphChildren.length > 0) {
			newChildren.push({
				type: 'paragraph',
				children: currentParagraphChildren
			});
		}
	}

	tree.children = newChildren;

	return tree;
}
