package com.project.bbibbi.domain.feed.service;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.entity.Feed;
//import com.project.bbibbi.domain.feed.entity.FeedImage;
//import com.project.bbibbi.domain.feed.entity.FeedImageTag;
//import com.project.bbibbi.domain.feed.repository.FeedImageRepository;
//import com.project.bbibbi.domain.feed.repository.FeedImageTagRepository;
import com.project.bbibbi.domain.feed.repository.FeedRepository;
import com.project.bbibbi.domain.feedBookmark.repository.FeedBookMarkRepository;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.feedReplyLike.repository.FeedReplyLikeRepository;
import com.project.bbibbi.domain.feedlike.repository.FeedLikeRepository;
import com.project.bbibbi.domain.follow.repository.FollowRepository;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.global.entity.*;
import com.project.bbibbi.global.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FeedService {
    private final FeedRepository feedRepository;
    //    private final FeedImageRepository feedImageRepository;
//    private final FeedImageTagRepository feedImageTagRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final FeedBookMarkRepository feedBookMarkRepository;
    private final FeedReplyLikeRepository feedReplyLikeRepository;
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Feed> beanUtils;

    public FeedService(FeedRepository feedRepository,
                       FeedLikeRepository feedLikeRepository,
                       FeedBookMarkRepository feedBookMarkRepository,
                       FollowRepository followRepository,
                       FeedReplyLikeRepository feedReplyLikeRepository,
                       MemberRepository memberRepository,
                       CustomBeanUtils<Feed> beanUtils) {
        this.feedRepository = feedRepository;
        this.feedLikeRepository = feedLikeRepository;
        this.feedBookMarkRepository = feedBookMarkRepository;
        this.followRepository = followRepository;
        this.feedReplyLikeRepository = feedReplyLikeRepository;
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
    }

    public Feed createFeed(Feed feed){

        Feed insertFeed = feedRepository.save(feed);

//        createFeedImages(feed.getImages());

        Optional<Member> optionalMember = memberRepository.findById(feed.getMember().getMemberId());

        Member member = optionalMember.orElseThrow(() -> {throw new RuntimeException() ; });

        insertFeed.setMember(Member.builder().memberId(feed.getMember().getMemberId()).nickname(member.getNickname()).profileImg(member.getProfileImg()).build());

//        optionalFeed.orElseThrow(() -> { throw new RuntimeException(); });

        return insertFeed;

    }


//    public void createFeedImages(List<FeedImage> feedImages){
//        for(FeedImage feedImage : feedImages){
//            feedImageRepository.save(feedImage);
//
//            createFeedTagImages(feedImage.getImageTags());
//        }
//    }
//
//    public void createFeedTagImages(List<FeedImageTag> feedImageTags){
//        for(FeedImageTag feedImageTag : feedImageTags){
//            feedImageTagRepository.save(feedImageTag);
//        }
//    }

    public Feed updateFeed(Feed feed){


        Feed preFeed = findFeed(feed.getFeedId());

        long preFeedId = preFeed.getFeedId();
        ArrayList<Long> preFeedImgId = new ArrayList<>();

//        if(preFeed.getImages() != null) {
//
//            for (FeedImage feedImage : preFeed.getImages()) {
//                preFeedImgId.add(feedImage.getFeedImageId());
//            }
//
//        }

//        if(preFeedImgId != null) {
//            for (Long i : preFeedImgId) {
//
//                feedImageTagRepository.deleteByFeedImageId(i);
//            }
//        }

//        feedImageRepository.deleteByFeedId(preFeedId);

        Feed updatingFeed = feedRepository.save(feed);

//        updatingFeedImages(feed.getImages());

        return updatingFeed;

    }

//    public void updatingFeedImages(List<FeedImage> feedImages){
//        for(FeedImage feedImage : feedImages){
//
//            FeedImage feedImage1 = feedImageRepository.save(feedImage);
//            //   feedImageTagRepository.deleteByFeedImageId(feedImage.getFeedImageId());
//
//            updatingFeedImageTags(feedImage.getImageTags());
//        }
//    }
//
//    public void updatingFeedImageTags(List<FeedImageTag> feedImageTags){
//        for(FeedImageTag feedImageTag : feedImageTags){
//
//            feedImageTagRepository.save(feedImageTag);
//
//        }
//    }

    public Feed findFeed(Long feedId){
        Feed findFeed = findVerifiedFeed(feedId);

        findFeed.setViews(findFeed.getViews() + 1);

        Feed viewUpFeed = feedRepository.save(findFeed);

        // 좋아요 개수
        Integer feedLikeCount = feedLikeRepository.feedLikeCount(viewUpFeed.getFeedId());
        viewUpFeed.setLikeCount(feedLikeCount);
        // 북마크 개수
        Integer bookmarkCount = feedBookMarkRepository.feedBookMarkCount(viewUpFeed.getFeedId());
        viewUpFeed.setBookMarkCount(bookmarkCount);

        // 로그인한 사람의 좋아요 여부... 로그인한 사람 memberId를 1L 로 가정
        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();


        if(member == null){
            viewUpFeed.setLikeYn(false);
        }
        else {
            int loginUserLikeYn = feedLikeRepository.existCount(viewUpFeed.getFeedId(), member.getMemberId());
            if(loginUserLikeYn == 0)
                viewUpFeed.setLikeYn(false);
            else viewUpFeed.setLikeYn(true);
        }

        if(member == null){
            viewUpFeed.setBookMarkYn(false);
        }
        else {
            int loginUserLikeYn = feedBookMarkRepository.existCount(viewUpFeed.getFeedId(), member.getMemberId());
            if(loginUserLikeYn == 0) viewUpFeed.setBookMarkYn(false);
            else viewUpFeed.setBookMarkYn(true);
        }

        Integer existCount = followRepository.existCount(loginUtils.getLoginId(),viewUpFeed.getMember().getMemberId());

        if(existCount == 0){
            viewUpFeed.setFollowYn(false);
        }
        else {
            viewUpFeed.setFollowYn(true);
        }

        if(viewUpFeed.getReplies() != null) {
            if (member == null) {

                // viewUpFeed 안의 replies의 LikeYn들을 전부 처리합시다
                for (FeedReply feedReply : viewUpFeed.getReplies()) {

                    // member가 null이면 로그인한 사람이 아니라는 것이므로 좋아요 표시를 무조건 false로 처리합니다.
                    // 그런데 아마 로그인 안한 사람은 null 보단 0으로 뜰 겁니다. 아무튼
                    feedReply.setReplyLikeYn(false);
                }

            } else {
                // member가 null 이 아니라면 그 멤버가 이 게시물에 좋아요 했는지 확인하면 됩니다.
                // 그런데 이걸 댓글 하나하나 확인해줘야 해서 for문을 쓸거에요.

                for (FeedReply feedReply : viewUpFeed.getReplies()) {

                    int loginUserLikeYn = feedReplyLikeRepository.existCount(feedReply.getFeedReplyId(), member.getMemberId());

                    if (loginUserLikeYn == 0)
                        feedReply.setReplyLikeYn(false);
                    else feedReply.setReplyLikeYn(true);
                }

            }
        }


        return viewUpFeed;
    }

//    public List<Feed> findFeeds(){
//
//        return feedRepository.findAll();
//
//    }

    // 필터기능 예시
    public Page<Feed> findFeeds(String searchcode, int page, int size){

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        String whereCode = searchcode.substring(0, searchcode.length() - 2);

        Page<Feed> selectedFeeds = new PageImpl<>(new ArrayList<>());

        if(whereCode.equals("LOCATION")){

            selectedFeeds = feedRepository.findByLocation(Location.valueOf(searchcode), pageRequest);

            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        else if(whereCode.equals("COUNT")){


            selectedFeeds = feedRepository.findByRoomCount(RoomCount.valueOf(searchcode), pageRequest);

            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        else if(whereCode.equals("INFO")){


            selectedFeeds = feedRepository.findByRoomInfo(RoomInfo.valueOf(searchcode), pageRequest);

            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        else if(whereCode.equals("SIZE")){


            selectedFeeds = feedRepository.findByRoomSize(RoomSize.valueOf(searchcode), pageRequest);

            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        else if(whereCode.equals("TYPE")){


            selectedFeeds = feedRepository.findByRoomType(RoomType.valueOf(searchcode), pageRequest);

            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        // 최신순 "RECENT00" -> "RECENT"
        else if(whereCode.equals("RECENT")){

            selectedFeeds = feedRepository.findByOrderByCreatedDateTimeDesc(pageRequest);
            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }

        }
        // 조회수순 "VIEW00" -> "VIEW"
        else if(whereCode.equals("VIEW")){

            selectedFeeds = feedRepository.findByOrderByViewsDesc(pageRequest);
            if(selectedFeeds.isLast()){
                for(Feed feed : selectedFeeds){
                    feed.setFinalPage(true);
                }
            }
        }


        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : selectedFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }


        return selectedFeeds;

    }

    public List<Feed> findSearchFeeds(String searchString, int page, int size){

        List<Feed> selectedFeeds = feedRepository.findBySearch(searchString, page, size);

        Integer selectedFeedsCount = feedRepository.findBySearchCount(searchString);


        if(((page+1)*size) >= selectedFeedsCount){
            for(Feed feed : selectedFeeds){
                feed.setFinalPage(true);
            }

        }

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : selectedFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }

        return selectedFeeds;

    }

    public List<Feed> findLikeTopTen(){

        List<Feed> selectedTopTenFeeds = feedRepository.findByLikeTopTen();

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : selectedTopTenFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }
        return selectedTopTenFeeds;

    }


    public List<Feed> findMyInfoFeeds(long myInfoMemberId){

//        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

//        Page<Feed> pageFeeds = feedRepository.findByMember(Member.builder().memberId(myInfoMemberId).build(),pageRequest); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        List<Feed> pageFeeds = feedRepository.findByMemberOrderByCreatedDateTimeDesc(Member.builder().memberId(myInfoMemberId).build());

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : pageFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }
        return  pageFeeds;
    }

    public List<Feed> findMyInfoFeedsLike(long myInfoMemberId){

        List<Feed> pageFeeds = feedRepository.findByMemberLike(myInfoMemberId);

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : pageFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }
        return pageFeeds;
    }

    public List<Feed> findMyInfoFeedsBookMark(long myInfoMemberId){

        List<Feed> pageFeeds = feedRepository.findByMemberBookMark(myInfoMemberId);

        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();

        for(Feed feed : pageFeeds){

            if(member == null){

                feed.setBookMarkYn(false);
            }
            else {
                int loginUserBookYn = feedBookMarkRepository.existCount(feed.getFeedId(), member.getMemberId());
                if(loginUserBookYn == 0) feed.setBookMarkYn(false);
                else feed.setBookMarkYn(true);
            }

        }

        return pageFeeds;
    }


    public void deleteFeed(Long feedId){
        Feed feed = findVerifiedFeed(feedId);
        feedRepository.delete(feed);
    }




//    public void verifyExistFeed(Long feedId){
//        Optional<Feed> feed = feedRepository.findById(feedId);
//
//        if(feed.isPresent()) throw new RuntimeException();
//    }

    public Feed findVerifiedFeed(Long feedId){
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);



        Feed findFeed = optionalFeed.orElseThrow(() -> { throw new RuntimeException(); });

        return findFeed;
    }

    //해당게시물에 딸린 댓글 전체 조회하는 기능이 없다.
}
