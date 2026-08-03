<script lang="ts">
	import Carousel from '$lib/components/others/Carousel.svelte';
	import { Aisler as AislerLogo } from '@davincibot/components';
	import { Alstom as AlstomLogo } from '@davincibot/components';
	import { Faulhaber as FaulhaberLogo } from '@davincibot/components';
	import { Gotronic as GotronicLogo } from '@davincibot/components';
	import { HDS as HDSLogo } from '@davincibot/components';
	import { IFT as IFTLogo } from '@davincibot/components';
	import { Igus as IgusLogo } from '@davincibot/components';
	import { KJ as KJLogo } from '@davincibot/components';
	import { Kurokesu } from '@davincibot/components';
	import { Mouser as MouserLogo } from '@davincibot/components';
	import { RS as RSLogo } from '@davincibot/components';

	interface Props {
		time?: number;
		pauseOnHover?: boolean;
		small?: boolean;
	}

	let { time = 60, pauseOnHover = true, small = $bindable(false) }: Props = $props();

	let isMobile = $state(false);
	let add_padding = $state<boolean>(false);
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 768;
	}
	$effect(() => {
		if (isMobile && small) {
			small = false;
			add_padding = true;
		}
	});
</script>

<Carousel {pauseOnHover} {small} {time}>
	<HDSLogo {small} />
	<RSLogo {small} />
	<FaulhaberLogo {small} />
	<AlstomLogo {small} />
	<IFTLogo {small} />
	<Kurokesu {small} />
	<GotronicLogo {small} />
	<AislerLogo {small} />
	<IgusLogo {small} />
	<KJLogo {small} />
	<MouserLogo {small} />
</Carousel>
<div class={add_padding ? 'h-12' : ''}></div>
