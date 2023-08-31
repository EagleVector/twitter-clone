import {useRouter} from 'next/router';
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { useCurrentUser } from "@/hooks/user";
import Image from 'next/image';
import { NextPage } from "next";
import { BsArrowLeft } from 'react-icons/bs';
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";

const UserProfilePage: NextPage = () => {
  const { user } = useCurrentUser();
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <BsArrowLeft className="text-4xl" />
            <div>
              <h1 className="text-xl font-medium">Cherry</h1>
              <h1 className="text-sm font-normal text-slate-500">100 Tweets</h1>
            </div>
          </nav>
        </div>
        <div className="p-4 border-b border-slate-800">
          {user?.profileImageURL && (
            <Image  
              src={user?.profileImageURL} 
              alt="user-image" 
              className="rounded-full"
              width={100} 
              height={100} 
            />
          )}
          <h1 className="text-3xl font-semibold mt-5">Cherry</h1>
        </div>
        <div>
          {user?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </TwitterLayout>
    </div>
  )
}

export default UserProfilePage;