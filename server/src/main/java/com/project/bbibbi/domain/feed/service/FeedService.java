package com.project.bbibbi.domain.feed.service;

import com.project.bbibbi.domain.feed.entity.Feed;
//import com.project.bbibbi.domain.feed.entity.FeedImage;
//import com.project.bbibbi.domain.feed.entity.FeedImageTag;
//import com.project.bbibbi.domain.feed.repository.FeedImageRepository;
//import com.project.bbibbi.domain.feed.repository.FeedImageTagRepository;
import com.project.bbibbi.domain.feed.repository.FeedRepository;
import com.project.bbibbi.domain.feedBookmark.repository.FeedBookMarkRepository;
import com.project.bbibbi.domain.feedlike.repository.FeedLikeRepository;
import com.project.bbibbi.domain.member.entity.Member;
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
    private final CustomBeanUtils<Feed> beanUtils;

    public FeedService(FeedRepository feedRepository,
                       FeedLikeRepository feedLikeRepository,
                       FeedBookMarkRepository feedBookMarkRepository,
                       CustomBeanUtils<Feed> beanUtils) {
        this.feedRepository = feedRepository;
        this.feedLikeRepository = feedLikeRepository;
        this.feedBookMarkRepository = feedBookMarkRepository;
        this.beanUtils = beanUtils;
    }

    public Feed createFeed(Feed feed){

        Feed insertFeed = feedRepository.save(feed);

//        createFeedImages(feed.getImages());

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
        Member member = Member.builder().memberId(1L).build();


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

        }
        else if(whereCode.equals("COUNT")){


            selectedFeeds = feedRepository.findByRoomCount(RoomCount.valueOf(searchcode), pageRequest);

        }
        else if(whereCode.equals("INFO")){


            selectedFeeds = feedRepository.findByRoomInfo(RoomInfo.valueOf(searchcode), pageRequest);

        }
        else if(whereCode.equals("SIZE")){


            selectedFeeds = feedRepository.findByRoomSize(RoomSize.valueOf(searchcode), pageRequest);

        }
        else if(whereCode.equals("TYPE")){


            selectedFeeds = feedRepository.findByRoomType(RoomType.valueOf(searchcode), pageRequest);

        }
        // 좋아요 "LIKE00" -> "LIKE"
        else if(whereCode.equals("LIKE")){

            List<Feed> likeFeed = feedRepository.findByOrderByLike();
            selectedFeeds = new PageImpl<>(likeFeed);

        }
        // 최신순 "RECENT00" -> "RECENT"
        else if(whereCode.equals("RECENT")){


            selectedFeeds = feedRepository.findByOrderByCreatedDateTimeDesc(pageRequest);

        }
        // 조회수순 "VIEW00" -> "VIEW"
        else if(whereCode.equals("VIEW")){

            selectedFeeds = feedRepository.findByOrderByViewsDesc(pageRequest);
        }

        return selectedFeeds;

    }

    public List<Feed> findSearchFeeds(String searchString, int page, int size){

        List<Feed> selectedFeeds = feedRepository.findBySearch(searchString, page, size);


        return selectedFeeds;

    }


    public Page<Feed> findMyInfoFeeds(int page, int size, long myInfoMemberId){

        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        Page<Feed> pageFeeds = feedRepository.findByMember(Member.builder().memberId(myInfoMemberId).build(),pageRequest); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        return  pageFeeds;
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
