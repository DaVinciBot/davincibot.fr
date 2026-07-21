<script lang="ts">
	import { Node } from '@davincibot/components';
	interface MarkdownNode {
		id?: string | number;
		type: string;
		children?: MarkdownNode[];
	}

	interface Props {
		tree?: MarkdownNode | null;
	}

	const { tree = null }: Props = $props();

	function nodeKey(child: MarkdownNode, index: number) {
		return child.id === undefined ? `${child.type}-${String(index)}` : String(child.id);
	}
</script>

{#if tree && Array.isArray(tree.children)}
	{#each tree.children as child, index (nodeKey(child, index))}
		<Node {child} />
	{/each}
{/if}

<style>
	:global(.md-article .prose-invert) {
		color: white;
	}
	:global(.md-article li) {
		margin-left: 1rem;
	}
	:global(.md-article table) {
		width: 100%;
	}
	:global(.md-article th),
	:global(.md-article td) {
		border-color: rgba(255, 255, 255, 0.15);
	}
	:global(.md-article pre) {
		white-space: pre-wrap;
	}
	:global(.md-article img) {
		max-width: 100%;
		height: auto;
	}
	:global(.md-article a) {
		text-decoration: underline;
	}
	:global(.md-article code) {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
	}
	:global(.md-article hr) {
		border-color: rgba(255, 255, 255, 0.15);
	}
</style>
