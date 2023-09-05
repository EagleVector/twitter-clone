import Image from 'next/image';
import { BiImageAlt } from 'react-icons/bi';
import FeedCard from '@/components/FeedCard';
import { useCallback, useState } from 'react';
import { useCurrentUser } from '@/hooks/user';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from '@/components/FeedCard/Layout/TwitterLayout';
import { graphqlClient } from '@/clients/api';
import {
	getAllTweetsQuery,
	getSignedURLForTweetQuery
} from '@/graphql/query/tweet';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import toast from 'react-hot-toast';

interface HomeProps {
	tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
	const { user } = useCurrentUser();
	const {tweets = props.tweets as Tweet[]} = useGetAllTweets()
	const { mutateAsync } = useCreateTweet();

	const [content, setContent] = useState('');
	const [imageURL, setImageURL] = useState('');


	const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
		return async (event: Event) => {
			event.preventDefault();
			const file: File | null | undefined = input.files?.item(0);
			if (!file) return;

			const { getSignedURLForTweet } = await graphqlClient.request(
				getSignedURLForTweetQuery,
				{
					imageName: file.name,
					imageType: file.type
				}
			);

			if (getSignedURLForTweet) {
				toast.loading('Uploading...', { id: '2' });
				await axios.put(getSignedURLForTweet, file, {
					headers: {
						'Content-Type': file.type
					}
				});
				toast.success('Upload Complete', { id: '2' });
				const url = new URL(getSignedURLForTweet);
				const myFilePath = `${url.origin}${url.pathname}`;
				setImageURL(myFilePath);
			}
		};
	}, []);

	const handleSelectImage = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');

		const handlerFn = handleInputChangeFile(input);

		input.addEventListener('change', handlerFn);

		input.click();
	}, [handleInputChangeFile]);

	const handleCreateTweet = useCallback(async () => {
		await mutateAsync({
			content,
			imageURL
		});
		setContent('');
		setImageURL('');
	}, [content, mutateAsync, imageURL]);

	return (
		<div>
			<TwitterLayout>
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
								onChange={e => setContent(e.target.value)}
								className="border w-full bg-transparent text-xl px-3 border-b border-slate-700"
								placeholder="What's happening?"
								rows={3}
							></textarea>
							{imageURL && (
								<Image
									src={imageURL}
									alt="tweet-image"
									width={300}
									height={300}
								/>
							)}
							<div className="mt-2 mb-3 flex justify-between items-center">
								<BiImageAlt
									onClick={handleSelectImage}
									className="text-xl cursor-pointer"
								/>
								<button
									onClick={handleCreateTweet}
									className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full cursor-pointer"
								>
									Tweet
								</button>
							</div>
						</div>
					</div>
				</div>
				{tweets?.map(tweet =>
					tweet ? (
						<FeedCard
							key={tweet?.id}
							data={tweet as Tweet}
						/>
					) : null
				)}
			</TwitterLayout>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<
	HomeProps
> = async context => {
	const allTweets = await graphqlClient.request(getAllTweetsQuery);

	return {
		props: {
			tweets: allTweets.getAllTweets as Tweet[]
		}
	};
};
