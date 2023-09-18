package com.project.bbibbi.domain.tip.service;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.follow.repository.FollowRepository;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipBookmark.repository.TipBookmarkRepository;
//import com.project.bbibbi.domain.tipImage.entity.TipImage;
//import com.project.bbibbi.domain.tipImage.service.TipImageService;
import com.project.bbibbi.domain.tipLike.repository.TipLikeRepository;
//import com.project.bbibbi.domain.tipTag.entity.TipTag;
//import com.project.bbibbi.domain.tipTag.service.TipTagService;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReplyLike.repository.TipReplyLikeRepository;
import com.project.bbibbi.domain.tipTag.entity.Tag;
import com.project.bbibbi.domain.tipTag.repository.TagRepository;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import com.project.bbibbi.global.exception.tipexception.TipNotFoundException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TipService {
    private final TipRepository tipRepository;

    private final TipLikeRepository tipLikeRepository;

    private final TipBookmarkRepository tipBookmarkRepository;
    private final TipReplyLikeRepository tipReplyLikeRepository;
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;


//    private final TipMapper tipMapper;

//    private final TipTagService tipTagService;

//    private final TipImageService tipImageService;

    public TipService(TipRepository tipRepository,
                      TipLikeRepository tipLikeRepository,
                      TipBookmarkRepository tipBookmarkRepository,
                      FollowRepository followRepository,
                      TipReplyLikeRepository tipReplyLikeRepository,
                      MemberRepository memberRepository,
                      TagRepository tagRepository) {
        this.tipRepository = tipRepository;
        this.tipLikeRepository = tipLikeRepository;
        this.tipBookmarkRepository = tipBookmarkRepository;
        this.tipReplyLikeRepository = tipReplyLikeRepository;
        this.followRepository = followRepository;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
//        this.tipMapper = tipMapper;
//        this.tipTagService = tipTagService;
//        this.tipImageService = tipImageService;
    }

    public Page<Tip> getAllTips(int page, int size) {

        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        Page<Tip> tipPages = tipRepository.findAll(pageRequest);

        if(tipPages.isLast()){
            for(Tip tip : tipPages){
                tip.setFinalPage(true);
            }
        }


        return tipPages;
    }

    public List<Tip> findMyInfoTips(long myInfoMemberId){

        List<Tip> pageTips = tipRepository.findByMemberOrderByCreatedDateTimeDesc(Member.builder().memberId(myInfoMemberId).build()); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        return  pageTips;
    }

    public List<Tip> findMyInfoTipsLike(long myInfoMemberId){

        List<Tip> pageTips = tipRepository.findByMemberLike(myInfoMemberId); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        return  pageTips;
    }

    public List<Tip> findMyInfoTipsBookMark(long myInfoMemberId){

        List<Tip> pageTips = tipRepository.findByMemberBookMark(myInfoMemberId); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        return  pageTips;
    }

    public List<Tip> getAllSearchTips(String searchString, int page, int size) {

        List<Tip> searchTips = tipRepository.findAllSearch(searchString,page,size );

        Integer searchTipsCount = tipRepository.findAllSearchCount(searchString);

        if(((page+1)*size) >= searchTipsCount){
            for(Tip tip : searchTips){
                tip.setFinalPage(true);
            }

        }

        return searchTips;
    }

    public List<Tip> getAllSearchTipTags(String searchTag, int page, int size) {

        List<Tip> searchTips = tipRepository.findAllSearchTag(searchTag,page,size );

        Integer searchTipsCount = tipRepository.findAllSearchCount(searchTag);

        if(((page+1)*size) >= searchTipsCount){
            for(Tip tip : searchTips){
                tip.setFinalPage(true);
            }

        }

        return searchTips;
    }

    public Tip getTip(Long tipId) {
        Tip findTip = findVerifiedTip(tipId);

        findTip.setViews(findTip.getViews() + 1);

        Tip viewUpTip = tipRepository.save(findTip);

        // 좋아요 개수
        Integer tipLikeCount = tipLikeRepository.tipLikeCount(viewUpTip.getTipId());
        viewUpTip.setLikeCount(tipLikeCount);

        // 북마크 개수
        Integer bookmarkCount = tipBookmarkRepository.tipBookmarkCount(viewUpTip.getTipId());
        viewUpTip.setBookmarkCount(bookmarkCount);

        // 로그인한 사람의 좋아요 여부... 로그인한 사람 memberId를 1L 로 가정
//        Member member = Member.builder().memberId(1L).build();
        Member member = Member.builder().memberId(loginUtils.getLoginId()).build();


        if(member == null){
            viewUpTip.setLikeYn(false);
        }
        else {
            int loginUserLikeYn = tipLikeRepository.existCount(viewUpTip.getTipId(), member.getMemberId());
            if(loginUserLikeYn == 0)
                viewUpTip.setLikeYn(false);
            else viewUpTip.setLikeYn(true);
        }

        if(member == null){
            viewUpTip.setBookmarkYn(false);
        }
        else {
            int loginUserLikeYn = tipBookmarkRepository.existCount(viewUpTip.getTipId(), member.getMemberId());
            if(loginUserLikeYn == 0) viewUpTip.setBookmarkYn(false);
            else viewUpTip.setBookmarkYn(true);
        }

        Integer existCount = followRepository.existCount(loginUtils.getLoginId(),viewUpTip.getMember().getMemberId());

        if(existCount == 0){
            viewUpTip.setFollowYn(false);
        }
        else {
            viewUpTip.setFollowYn(true);
        }

        if(loginUtils.getLoginId() == null){
            viewUpTip.setFixYn(false);
        }
        else {
            long tipAuthorId = viewUpTip.getMember().getMemberId();
            if(tipAuthorId != loginUtils.getLoginId())
                viewUpTip.setFixYn(false);
            else viewUpTip.setFixYn(true);
        }

        if(viewUpTip.getReplies() != null) {
            if (member == null) {

                // viewUpFeed 안의 replies의 LikeYn들을 전부 처리합시다
                for (TipReply tipReply : viewUpTip.getReplies()) {

                    // member가 null이면 로그인한 사람이 아니라는 것이므로 좋아요 표시를 무조건 false로 처리합니다.
                    // 그런데 아마 로그인 안한 사람은 null 보단 0으로 뜰 겁니다. 아무튼
                    tipReply.setReplyLikeYn(false);
                }

            } else {
                // member가 null 이 아니라면 그 멤버가 이 게시물에 좋아요 했는지 확인하면 됩니다.
                // 그런데 이걸 댓글 하나하나 확인해줘야 해서 for문을 쓸거에요.

                for (TipReply tipReply : viewUpTip.getReplies()) {

                    int loginUserLikeYn = tipReplyLikeRepository.existCount(tipReply.getTipReplyId(), member.getMemberId());

                    if (loginUserLikeYn == 0)
                        tipReply.setReplyLikeYn(false);
                    else tipReply.setReplyLikeYn(true);
                }

            }
        }

//        List<TipTag> tipTags = tipTagService.findTagListByTip(viewUpTip);
//        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(viewUpTip);
//        tipResponseDto.setTiptags(tipTags);

        // 팔로우 예비
//        Integer existCount = followRepository.existCount(loginUtils.getLoginId(),viewUpTip.getMember().getMemberId());
//
//        if(existCount == 0){
//            viewUpTip.setFollowYn(false);
//        }
//        else {
//            viewUpTip.setFollowYn(true);
//        }



        return viewUpTip;
    }


    public Tip findVerifiedTip(Long tipId){
        Optional<Tip> optionalTip = tipRepository.findById(tipId);

        Tip findTip = optionalTip.orElseThrow(() -> { throw new TipNotFoundException(); });

        return findTip;
    }

    public Tip createTip(Tip tip) {

        Tip insertTip = tipRepository.save(tip);

        Optional<Member> optionalMember = memberRepository.findById(tip.getMember().getMemberId());

        Member member = optionalMember.orElseThrow(() -> {throw new RuntimeException() ; });

        insertTip.setMember(Member.builder().memberId(tip.getMember().getMemberId()).nickname(member.getNickname()).profileImg(member.getProfileImg()).build());


        return insertTip;
    }

    public Tip updateTip(Long tipId, Tip updatedTip) {
        Tip tip = tipRepository.findById(tipId)
                .orElseThrow();

        // 기존시간은 그대로
        updatedTip.setCreatedDateTime(tip.getCreatedDateTime());

        // 기존 사진
//        List<Long> curImgId = new ArrayList<>();
//        for(TipImage tipImage : tip.getTipImages()){
//            Long add = tipImage.getTipImageId();
//
//            curImgId.add(add);
//        }

        tip.setTitle(updatedTip.getTitle());
        tip.setCoverPhoto(updatedTip.getCoverPhoto());
        tip.setContent(updatedTip.getContent());

        // 새 사진은 insert하고
//        for (TipImage tipImage : updatedTip.getTipImages()) {
//            tipImage.setTip(tip); // TipImage에 Tip 연관성 설정
//            tipImageService.saveTipImage(tipImage);
//        }

        // 구 사진은 삭제
//        for(Long long1 : curImgId){
//            tipRepository.deleteImageById(long1);
//        }

        tagRepository.deleteByTipId(tipId);

        Tip updatingTip = tipRepository.save(tip);

        updateTags(updatedTip, tipId);

//        updatingTip.setTipImages(updatedTip.getTipImages());

        return updatingTip;
    }

    public void updateTags(Tip tip, long tipId){


        tip.setTipId(tipId);

        if(tip.getTags() != null) {
            for (Tag tag : tip.getTags()) {
                tagRepository.save(tag);
            }
        }

    }

    public void deleteTip(Long tipId) {
        Tip tip = findVerifiedTip(tipId);

        tipRepository.delete(tip);
    }

    public Slice<Tip> findTipAllByCreatedAtDesc(String searchString, Pageable pageable) {
        return tipRepository.findAllTipsPageableOrderByCreatedAtDesc(searchString, pageable);
    }
}
