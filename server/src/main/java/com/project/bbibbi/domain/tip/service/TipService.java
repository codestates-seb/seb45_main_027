package com.project.bbibbi.domain.tip.service;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipBookmark.repository.TipBookmarkRepository;
//import com.project.bbibbi.domain.tipImage.entity.TipImage;
//import com.project.bbibbi.domain.tipImage.service.TipImageService;
import com.project.bbibbi.domain.tipLike.repository.TipLikeRepository;
//import com.project.bbibbi.domain.tipTag.entity.TipTag;
//import com.project.bbibbi.domain.tipTag.service.TipTagService;
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

//    private final TipMapper tipMapper;

//    private final TipTagService tipTagService;

//    private final TipImageService tipImageService;

    public TipService(TipRepository tipRepository,
                      TipLikeRepository tipLikeRepository,
                      TipBookmarkRepository tipBookmarkRepository) {
        this.tipRepository = tipRepository;
        this.tipLikeRepository = tipLikeRepository;
        this.tipBookmarkRepository = tipBookmarkRepository;
//        this.tipMapper = tipMapper;
//        this.tipTagService = tipTagService;
//        this.tipImageService = tipImageService;
    }

    public Page<Tip> getAllTips(int page, int size) {

        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        return tipRepository.findAll(pageRequest);
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


        return tipRepository.findAllSearch(searchString,page,size );
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
        Member member = Member.builder().memberId(1L).build();


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

//        List<TipTag> tipTags = tipTagService.findTagListByTip(viewUpTip);
//        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(viewUpTip);
//        tipResponseDto.setTiptags(tipTags);

        return viewUpTip;
    }

    public Tip findVerifiedTip(Long tipId){
        Optional<Tip> optionalTip = tipRepository.findById(tipId);

        Tip findTip = optionalTip.orElseThrow(() -> { throw new TipNotFoundException(); });

        return findTip;
    }

    public Tip createTip(Tip tip) {
        return tipRepository.save(tip);
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

        Tip updatingTip = tipRepository.save(tip);


//        updatingTip.setTipImages(updatedTip.getTipImages());

        return updatingTip;
    }

    public void deleteTip(Long tipId) {
        Tip tip = findVerifiedTip(tipId);

        tipRepository.delete(tip);
    }

    public Slice<Tip> findTipAllByCreatedAtDesc(String searchString, Pageable pageable) {
        return tipRepository.findAllTipsPageableOrderByCreatedAtDesc(searchString, pageable);
    }
}
