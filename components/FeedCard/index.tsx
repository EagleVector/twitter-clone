import React from "react";
import Image from 'next/image';
import { BiMessageRounded, BiRepost, BiBarChart, BiUpload } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';

const FeedCard: React.FC = () => {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-1">
          <Image 
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/99639097?v=4" 
          alt="user-image" 
          height={50} 
          width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Cherry</h5>
          <p>So someone said:
              If you are a lover, you got to be a fighter. 
              Cause if you do not fight for your love, what kind of love do you have.
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[85%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <BiRepost />
            </div>
            <div>
              <BsHeart />
            </div>
            <div>
              <BiBarChart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FeedCard;