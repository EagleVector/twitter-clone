import { useCurrentUser } from '@/hooks/user';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';

interface TwitterLayoutProps {
	children: React.ReactNode;
}

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

const TwitterLayout: React.FC<TwitterLayoutProps> = props => {
	const { user } = useCurrentUser();

	const queryClient = useQueryClient();

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
			<div className="grid grid-cols-12 h-screen w-screen sm:px-36">
				<div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
					<div>
						<div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
							<BsTwitter />
						</div>
						<div className="mt-4 text-1xl pr-4">
							<ul>
								{sidebarMenuItems.map(item => (
									<li
										className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
										key={item.title}
									>
										<span className='text-3xl'>{item.icon}</span>
										<span className='hidden sm:inline text-xl'>{item.title}</span>
									</li>
								))}
							</ul>
							<div className="mt-5 px-3">
								<button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
									Tweet
								</button>
								<button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
									<BsTwitter />
								</button>
							</div>
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
						<div className='hidden sm:block'>
							<h3 className="text-xl cursor-pointer">
								{user.firstName} {user.lastName}
							</h3>
						</div>
					</div>
				)}
				<div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					{props.children}
				</div>
				<div className="col-span-0 sm:col-span-3 p-5">
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
};

export default TwitterLayout;
