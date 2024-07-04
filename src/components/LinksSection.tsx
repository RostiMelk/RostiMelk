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
			<div className="mb-6">
				<FindMeOn />
			</div>

			<ul>
				{Links.map(({ name, url, icon }) => (
					<li key={name} className="group flex gap-2 w-fit items-center">
						<a key={name} href={url} target="_blank" rel="noopener noreferrer" className="flex-wrap py-2">
							{icon}
						</a>
						<span className="group-hover:block group-focus:block hidden">
							<Arrow />
						</span>
					</li>
				))}
			</ul>
		</section>
	);
};
