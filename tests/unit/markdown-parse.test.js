import { describe, expect, it } from 'vitest';

import { parseMarkdownToAst } from '../../src/lib/markdown/parse.js';

describe('markdown parser', () => {
	it('keeps paragraphs unchanged when no image is present', async () => {
		const tree = await parseMarkdownToAst('Paragraphe simple');

		expect(tree.type).toBe('root');
		expect(tree.children).toHaveLength(1);
		expect(tree.children[0].type).toBe('paragraph');
	});

	it('splits image-containing paragraph into paragraph/image/paragraph nodes', async () => {
		const tree = await parseMarkdownToAst('Avant ![alt](https://example.com/img.jpg) apres');
		const nodeTypes = tree.children.map((node) => node.type);

		expect(nodeTypes).toEqual(['paragraph', 'image', 'paragraph']);
		expect(tree.children[1].url).toBe('https://example.com/img.jpg');
	});

	it('returns an empty root for empty markdown', async () => {
		const tree = await parseMarkdownToAst('');

		expect(tree.type).toBe('root');
		expect(tree.children).toEqual([]);
	});
});
