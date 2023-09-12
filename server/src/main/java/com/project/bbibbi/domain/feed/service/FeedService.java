package com.project.bbibbi.domain.feed.service;

import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feed.entity.FeedImage;
import com.project.bbibbi.domain.feed.repository.FeedImageRepository;
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
    private final CustomBeanUtils<Feed> beanUtils;

    public FeedService(FeedRepository feedRepository, FeedImageRepository feedImageRepository, CustomBeanUtils<Feed> beanUtils) {
        this.feedRepository = feedRepository;
        this.feedImageRepository = feedImageRepository;
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
        }
    }

    public Feed updateFeed(Feed feed){

        Feed updatingFeed = feedRepository.save(feed);

        feedImageRepository.deleteByFeedId(feed.getFeedId());

        updatingFeedImages(feed.getImages());

        return updatingFeed;

    }

    public void updatingFeedImages(List<FeedImage> feedImages){
        for(FeedImage feedImage : feedImages){

            feedImageRepository.save(feedImage);
        }
    }

    public Feed findFeed(Long feedId){
        return findVerifiedFeed(feedId);
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
