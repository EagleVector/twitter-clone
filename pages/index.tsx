import Image from 'next/image';
import { BiImageAlt } from 'react-icons/bi';
import FeedCard from '@/components/FeedCard';
import { useCallback, useState } from 'react';
import { useCurrentUser } from '@/hooks/user';
import { useCreateTweet} from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from '@/components/FeedCard/Layout/TwitterLayout';
import { graphqlClient } from '@/clients/api';
import { getAllTweetsQuery } from '@/graphql/query/tweet';
import { GetServerSideProps } from 'next';

interface HomeProps {
	tweets?: Tweet[]
}

export default function Home( props: HomeProps ) {
	const { user } = useCurrentUser();
	const { mutate } = useCreateTweet();

	const [content, setContent] = useState('');

	const handleSelectImage = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
	}, []);

	const handleCreateTweet = useCallback(() => {
		mutate({
			content
		});
		setContent('');
	}, [content, mutate]);

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
						props.tweets?.map((tweet) =>
							tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null 
						)}
			</TwitterLayout>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async(context) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);

  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[]
    }
  }
}