package com.project.bbibbi.domain.tip.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipImage.entity.TipImage;
import com.project.bbibbi.domain.tipImage.service.TipImageService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TipService {
    private final TipRepository tipRepository;

    private final TipImageService tipImageService;

    public TipService(TipRepository tipRepository, TipImageService tipImageService) {
        this.tipRepository = tipRepository;
        this.tipImageService = tipImageService;
    }

    public Page<Tip> getAllTips(int page, int size) {

        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        return tipRepository.findAll(pageRequest);
    }

    public Page<Tip> findMyInfoTips(int page, int size, long myInfoMemberId){

        PageRequest pageRequest =  PageRequest.of(page, size, Sort.by("createdDateTime").descending());

        Page<Tip> pageTips = tipRepository.findByMember(Member.builder().memberId(myInfoMemberId).build(),pageRequest); // 비쿼리 성공

//       List<Feed> pageFeeds = feedRepository.findByMember(myInfoMemberId, page, size);  // 쿼리 방법

        return  pageTips;
    }

//    public List<Tip> getAllSearchTips(String searchString, int page, int size) {
//
//
//        return tipRepository.findAllSearch(searchString,page,size );
//    }

    public Tip getTipById(Long tipId) {
        return tipRepository.findById(tipId)
                .orElseThrow();
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
        List<Long> curImgId = new ArrayList<>();
        for(TipImage tipImage : tip.getTipImages()){
            Long add = tipImage.getTipImageId();

            curImgId.add(add);
        }

        tip.setTitle(updatedTip.getTitle());
        tip.setCoverPhoto(updatedTip.getCoverPhoto());
        tip.setContent(updatedTip.getContent());

        // 새 사진은 insert하고
        for (TipImage tipImage : updatedTip.getTipImages()) {
            tipImage.setTip(tip); // TipImage에 Tip 연관성 설정
            tipImageService.saveTipImage(tipImage);
        }

        // 구 사진은 삭제
        for(Long long1 : curImgId){
            tipRepository.deleteImageById(long1);
        }

        Tip updatingTip = tipRepository.save(tip);


        updatingTip.setTipImages(updatedTip.getTipImages());

        return updatingTip;
    }

    public void deleteTip(Long tipId) {
        Tip tip = tipRepository.findById(tipId)
                .orElseThrow();

        tipRepository.delete(tip);
    }

    public Slice<Tip> findTipAllByCreatedAtDesc(String searchString, Pageable pageable) {
        return tipRepository.findAllTipsPageableOrderByCreatedAtDesc(searchString, pageable);
    }
}
