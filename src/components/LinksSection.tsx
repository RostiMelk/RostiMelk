import { FindMeOn, LinkedIn, Twitter, GitHub, Arrow } from './svgs';

const Links = [
	{
		name: 'GitHub',
		url: 'https://github.com/rostimelk',
		icon: <GitHub />,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/rostimelk/',
		icon: <LinkedIn />,
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/rostimelk',
		icon: <Twitter />,
	},
];

export const LinksSection = async () => {
	return (
		<section>
			<div className="mb-5">
				<FindMeOn />
			</div>

			<ul className="flex gap-5 flex-col">
				{Links.map(({ name, url, icon }) => (
					<li key={name} className="group flex gap-2 items-center h-10">
						<a key={name} href={url} target="_blank" rel="noopener noreferrer">
							{icon}
						</a>
						<span className="group-hover:block  group-focus:block hidden">
							<Arrow />
						</span>
					</li>
				))}
			</ul>
		</section>
	);
};
