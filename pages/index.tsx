import Image from 'next/image';
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from 'react-icons/bs';
import { BiHomeCircle, BiHash, BiUser, BiMoney } from 'react-icons/bi';
import {CiCircleMore} from 'react-icons/ci'
import FeedCard from '@/components/FeedCard';


interface TwitterSidebarButton {
	title: string;
	icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
	{
		title: 'Home',
		icon: <BiHomeCircle />
	},
	{
		title: 'Explore',
		icon: <BiHash />
	},
	{
		title: 'Notifications',
		icon: <BsBell />
	},
	{
		title: 'Messages',
		icon: <BsEnvelope />
	},
	{
		title: 'Bookmarks',
		icon: <BsBookmark />
	},
	{
		title: 'Monetization',
		icon: <BiMoney />
	},
	{
		title: 'Profile',
		icon: <BiUser />
	},
	{
		title: 'More Options',
		icon: <CiCircleMore />
	}
];

export default function Home() {
	return (
		<div>
			<div className="grid grid-cols-12 h-screen w-screen px-36">
				<div className="col-span-3 pt-8 px-4">
					<div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
						<BsTwitter />
					</div>
					<div className="mt-4 text-1xl pr-4">
						<ul>
							{sidebarMenuItems.map(item => (
								<li
									className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
									key={item.title}
								>
									<span>{item.icon}</span>
									<span>{item.title}</span>
								</li>
							))}
						</ul>
						<div className="mt-5 px-3">
							<button className="bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
								Tweet
							</button>
						</div>
					</div>
				</div>
				<div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
				</div>
				<div className="col-span-3"></div>
			</div>
		</div>
	);
}
