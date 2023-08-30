import Image from 'next/image';
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from 'react-icons/bs';
import {
	BiHomeCircle,
	BiHash,
	BiUser,
	BiMoney,
	BiImageAlt
} from 'react-icons/bi';
import { CiCircleMore } from 'react-icons/ci';
import FeedCard from '@/components/FeedCard';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { graphqlClient } from '@/clients/api';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';

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
	const { user } = useCurrentUser();
	const { tweets = [] } = useGetAllTweets();
	const { mutate } = useCreateTweet()

	const queryClient = useQueryClient();

	const [content, setContent] = useState("");

	const handleSelectImage = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
	}, []);

	const handleCreateTweet = useCallback(() => {
		mutate({
			content,
		})
		setContent("");
	}, [content, mutate])


	const handleLoginWithGoogle = useCallback(
		async (cred: CredentialResponse) => {
			const googleToken = cred.credential;
			if (!googleToken) return toast.error(`Google Token Not Found`);

			const { verifyGoogleToken } = await graphqlClient.request(
				verifyUserGoogleTokenQuery,
				{ token: googleToken }
			);

			toast.success('Verification Success');
			console.log(verifyGoogleToken);

			if (verifyGoogleToken) {
				window.localStorage.setItem('__twitter_token', verifyGoogleToken);
			}
			await queryClient.invalidateQueries(['current-user']);
		},
		[queryClient]
	);


	return (
		<div>
			<div className="grid grid-cols-12 h-screen w-screen px-36">
				<div className="col-span-3 pt-8 px-4 relative">
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
				{user && (
					<div className="absolute bottom-5 flex gap-2 items-center bg-slate-900 p-3 rounded-xl">
						{user && user.profileImageURL && (
							<Image
								className="rounded-full"
								src={user?.profileImageURL}
								alt="user-image"
								height={40}
								width={40}
							/>
						)}
						<div>
							<h3 className="text-xl cursor-pointer">
								{user.firstName} {user.lastName}
							</h3>
						</div>
					</div>
				)}
				<div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					<div>
						<div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-3 hover:bg-slate-900 transition-all cursor-pointer"></div>
						<div className="grid grid-cols-12 gap-1">
							<div className="col-span-2 p-3">
								{user?.profileImageURL && (
									<Image
										className="rounded-full"
										src={user?.profileImageURL}
										alt="user-image"
										height={50}
										width={50}
									/>
								)}
							</div>
							<div className="col-span-10">
								<textarea
									value={content}
									onChange={(e) => setContent(e.target.value)}
									className="border w-full bg-transparent text-xl px-3 border-b border-slate-700"
									placeholder="What's happening?"
									rows={3}
								></textarea>
								<div className="mt-2 mb-3 flex justify-between items-center">
									<BiImageAlt onClick={handleSelectImage} className="text-xl cursor-pointer" />
									<button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full cursor-pointer">
										Tweet
									</button>
								</div>
							</div>
						</div>
					</div>
					{
						tweets?.map((tweet) =>
							tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null 
						)}
						
				</div>
				<div className="col-span-4 p-5">
					{!user && (
						<div className="p-5 bg-slate-800 rounded-lg">
							<h1 className="my-2 text-xl">New To Twitter?</h1>
							<GoogleLogin onSuccess={handleLoginWithGoogle} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
