import React, { useState, forwardRef  } from "react";

//  함수형 컴포넌트는 ref 속성을 가질 수 없지만, forwardRef를 사용하면 이러한 제약을 우회할 수 있다.
const Comment = forwardRef((props, ref) => {  // 사이드바에서 댓글 클릭시 이동을 위해 받아 옴.
  // 댓글 좋아요
  const [like, setLike] = useState(false);
  // 답글 달기
  const [showReply, setShowReply] = useState(false);

    return (
      <div className="mt-10" ref={ref}>
        {/* 댓글 수 표시 */}
        <div className="flex">
          <span className="text-xl font-semibold">댓글</span>
          <span className="text-xl font-semibold text-[#35C5F0] ml-2">0</span>
        </div>

        {/* 댓글 입력창 */}
        <div className="flex w-full mt-4">
          <img
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
            alt="유저사진"
          />
          <div className="flex w-full relative">
            <input className="h-full w-full ml-4 border rounded-lg pl-4" />
            <button className=" absolute right-0 top-1/4 pr-4"> 입력 </button>
          </div>
        </div>

        <div className="flex flex-col">
          {/* 댓글 작성보기 */}
          <div className="flex flex-col items-start mt-10">
            <div className="flex items-start">
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                alt="유저사진"
              />

              <div className="flex flex-col ml-4 w-full">
                {/* 작성자 */}
                <span className="text-lg font-semibold">질문 작성자</span>

                {/* 댓글 내용 */}
                <span className="my-4 text-base">
                  댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
                  댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
                </span>

                {/* 작성날짜, 좋아요, 답글 */}
                <div className="flex items-center text-gray-500 font-medium text-base">
                  {/* 작성날짜 */}
                  <span>작성날짜</span>

                  {/* 좋아요 */}
                  <button
                    className="flex items-center mx-4"
                    onClick={() => setLike(!like)}>
                    <img
                      className="w-6 h-6 mr-1"
                      src={
                        like
                          ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                          : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                      }
                      alt="좋아요"
                    />
                    <span>좋아요</span>
                  </button>

                  {/* 답글 */}
                  <button onClick={() => setShowReply(!showReply)}>
                    답글 달기
                  </button>
                </div>

                {/* 답글 입력창 */}
                {showReply && (
                  <div className=" flex w-full mt-6">
                    <img
                      src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                      alt="유저사진"
                    />
                    <div className="flex w-full relative">
                      <input className="h-full w-full ml-4 border rounded-lg pl-4" />
                      <button className=" absolute right-0 top-1/4 pr-4">
                        입력
                      </button>
                    </div>
                  </div>
                )}

                {/* 답글 작성보기 */}
                <div className="flex items-start mt-10 bg-[#fceecd] p-8 rounded-lg shadow">
                  <img
                    src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                    alt="유저사진"
                  />

                  <div className="flex flex-col ml-4 w-full">
                    {/* 작성자 */}
                    <span className="text-lg font-semibold">답변 작성자</span>

                    {/* 댓글 내용 */}
                    <span className="my-4 text-base">
                      답글내용 답글내용 답글내용 답글내용 답글내용 답글내용
                      답글내용 답글내용 답글내용 답글내용 답글내용 답글내용
                      답글내용 답글내용
                    </span>

                    {/* 작성날짜 */}
                    <div className="flex items-center text-gray-500 font-medium text-base">
                      {/* 작성날짜 */}
                      <span>작성날짜</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
});

export default Comment;