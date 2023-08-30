import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { NextPage } from "next";
const userProfilePage: NextPage = () => {
  return (
    <div>
      <TwitterLayout>
        <h1>Profile Page</h1>
      </TwitterLayout>
    </div>
  )
}

export default userProfilePage;