package com.project.bbibbi.domain.feed.service;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feed.entity.FeedImage;
import com.project.bbibbi.domain.feed.entity.FeedImageTag;
import com.project.bbibbi.domain.feed.repository.FeedImageRepository;
import com.project.bbibbi.domain.feed.repository.FeedImageTagRepository;
import com.project.bbibbi.domain.feed.repository.FeedRepository;
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
    private final FeedImageRepository feedImageRepository;
    private final FeedImageTagRepository feedImageTagRepository;
    private final CustomBeanUtils<Feed> beanUtils;

    public FeedService(FeedRepository feedRepository,
                       FeedImageRepository feedImageRepository,
                       FeedImageTagRepository feedImageTagRepository,
                       CustomBeanUtils<Feed> beanUtils) {
        this.feedRepository = feedRepository;
        this.feedImageRepository = feedImageRepository;
        this.feedImageTagRepository = feedImageTagRepository;
        this.beanUtils = beanUtils;
    }

    public Feed createFeed(Feed feed){

        Feed insertFeed = feedRepository.save(feed);

        createFeedImages(feed.getImages());

        return insertFeed;

    }

    public void createFeedImages(List<FeedImage> feedImages){
        for(FeedImage feedImage : feedImages){
            feedImageRepository.save(feedImage);

            createFeedTagImages(feedImage.getImageTags());
        }
    }

    public void createFeedTagImages(List<FeedImageTag> feedImageTags){
        for(FeedImageTag feedImageTag : feedImageTags){
            feedImageTagRepository.save(feedImageTag);
        }
    }

    public Feed updateFeed(Feed feed){

        Feed preFeed = findFeed(feed.getFeedId());

        long preFeedId = preFeed.getFeedId();
        ArrayList<Long> preFeedImgId = new ArrayList<>();

        if(preFeed.getImages() != null) {

            for (FeedImage feedImage : preFeed.getImages()) {
                preFeedImgId.add(feedImage.getFeedImageId());
            }

        }

        if(preFeedImgId != null) {
            for (Long i : preFeedImgId) {

                feedImageTagRepository.deleteByFeedImageId(i);
            }
        }

        feedImageRepository.deleteByFeedId(preFeedId);

        Feed updatingFeed = feedRepository.save(feed);

        updatingFeedImages(feed.getImages());

        return feed;

    }

    public void updatingFeedImages(List<FeedImage> feedImages){
        for(FeedImage feedImage : feedImages){

            System.out.println("11");
            System.out.println("feeIg : "+feedImage.getFeedImageId());
            FeedImage feedImage1 = feedImageRepository.save(feedImage);

            System.out.println("feeIg2 : "+feedImage1.getFeedImageId());


            System.out.println("22");


            //   feedImageTagRepository.deleteByFeedImageId(feedImage.getFeedImageId());

            System.out.println("33");


            updatingFeedImageTags(feedImage.getImageTags());
        }
    }

    public void updatingFeedImageTags(List<FeedImageTag> feedImageTags){
        for(FeedImageTag feedImageTag : feedImageTags){

            System.out.println("111");

            feedImageTagRepository.save(feedImageTag);

            System.out.println("222");

        }
    }

    public Feed findFeed(Long feedId){
        Feed findFeed = findVerifiedFeed(feedId);

        findFeed.setViews(findFeed.getViews() + 1);

        Feed viewUpFeed = feedRepository.save(findFeed);

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

//            selectedFeeds = feedRepository.findByOrderByLike();
        }
        // 최신순 "RECENT00" -> "RECENT"
        else if(whereCode.equals("RECENT")){


            selectedFeeds = feedRepository.findByOrderByCreatedDateTimeDesc(pageRequest);

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
