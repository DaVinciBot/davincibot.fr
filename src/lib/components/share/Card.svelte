<script lang="ts">
	interface CardProps {
		title?: string;
		description?: string;
		image?: string;
		link?: string;
	}

	const { title = '', description = '', image = '', link = '' }: CardProps = $props();
</script>

<div
	class="border-dark-light-blue flex w-112.5 min-w-96 flex-col gap-2 rounded-xl border-[3.5px] p-4"
>
	<div class="flex justify-between">
		<h1 class="title-2lines text-2xl font-bold">{title}</h1>
	</div>
	<div class="flex items-start gap-5">
		<div class="flex h-28 max-w-[50%] flex-col justify-between overflow-hidden">
			<p class="text-dark-blue-gray mb-2 line-clamp-4 text-justify text-sm">{description}</p>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href={link} class=" text-dark-light-blue">Lire la suite...</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</div>
		<div id="img-mask" class="h-28">
			<img src={image} alt={title} class="aspect-auto h-28" />
		</div>
	</div>
</div>

<style>
	/* Fix the title to exactly two lines for consistent height */
	.title-2lines {
		line-height: 1.2;
		max-height: calc(2 * 1.2em);
		min-height: calc(2 * 1.2em);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.line-clamp-4 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	#img-mask::after {
		content: '';
		width: 100%;
		height: 100%;
		transform: translateY(-100%);
		position: relative;
		display: block;
		/* add blue transparent filter  */
		background:
			linear-gradient(rgb(2, 50, 255, 0.15), rgba(2, 50, 255, 0.15)),
			url('') no-repeat center center;
		background-size: cover;
	}
	#img-mask img {
		object-fit: cover;
	}
</style>
