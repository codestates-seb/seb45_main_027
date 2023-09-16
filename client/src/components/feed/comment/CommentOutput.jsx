import React from 'react';

const CommentOutput = () => {
    return (
      <div>
        {/* 댓글 수 표시 */}
        <div className="flex">
          <span className="text-xl font-semibold">댓글</span>
          <span className="text-xl font-semibold text-[#35C5F0] ml-2">
            댓글댓글댓글
          </span>
        </div>

        {/* 댓글 출력창 */}
        {/* {comments && */}
          {/* comments.map((comment, index) => ( */}
            <div
                // key={comment.id}
                className="flex flex-col mt-10">
              <div className="bg-[#fceecd75] p-8 rounded-lg shadow">
                <div className="flex items-start">
                  <img
                    src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                    alt="유저사진"
                  />
                  <div className="flex flex-col ml-4 w-full">
                    <span className="text-lg font-semibold">
                      닉네임
                    </span>
                    <span className="my-4 text-base">
                      ㅁㄴㅇㅁㄴㅇㅁㄴㅇ
                    </span>
                    {/* 작성날짜, 좋아요, 답글 */}
                    <div className="flex items-center text-gray-500 font-medium text-base">
                      {/* 작성날짜 */}
                      <span className="mr-2.5">작성날짜</span>
                      {/* 좋아요 */}
                      {/* <button
                        className="flex items-center"
                        onClick={() => toggleLike(comment)}>
                        <img
                          className="w-6 h-6 mr-1"
                          src={
                            like[comment]
                              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                          }
                          alt="좋아요"
                        />
                        <span className="mr-1">좋아요</span>
                      </button> */}
                      {/* 답글 */}
                      <button className="mx-2">답글 달기</button>
                      {/* 수정 */}
                      <button
                        className="mx-2"
                        // onClick={}
                                  >
                        수정하기
                      </button>
                      {/* 삭제 */}
                      <button
                        className="mx-2"
                        // onClick={() => { }}
                                  >
                        삭제하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* ))} */}
      </div>
    );
};

export default CommentOutput;