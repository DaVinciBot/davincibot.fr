<script lang="ts">
	interface FooterItem {
		text: string;
		href: string;
	}

	interface FooterElProps {
		items?: FooterItem[];
		title?: string;
	}

	const { items = [{ text: '', href: '' }], title = '' }: FooterElProps = $props();
</script>

<div
	class="order-3 flex h-full flex-col content-between items-start justify-between text-left md:m-0"
>
	<p class="pb-1 font-bold text-white uppercase">{title}</p>
	<div class="flex flex-col items-start">
		<!-- eslint-disable svelte/no-navigation-without-resolve svelte/no-at-html-tags -->
		{#each items as item (item.href)}
			<a href={item.href} class="text-dark-blue-gray"> {@html item.text} </a>
		{/each}
		<!-- eslint-enable svelte/no-navigation-without-resolve svelte/no-at-html-tags -->
	</div>
</div>
