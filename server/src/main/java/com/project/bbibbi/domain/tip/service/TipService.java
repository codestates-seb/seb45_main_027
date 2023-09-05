package com.project.bbibbi.domain.tip.service;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tip.repository.TipRepository;
import com.project.bbibbi.domain.tipImage.entity.TipImage;
import com.project.bbibbi.domain.tipImage.service.TipImageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public List<Tip> getAllTips() {
        return tipRepository.findAll();
    }

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

//    public void addImageToTip(Long tipId, MultipartFile imageFile) {
//        Tip tip = tipRepository.findById(tipId).orElse(null);
//        if (tip == null) {
//            throw new IllegalArgumentException("Tip not found");
//        }
//
//        String storedFileName = tipImageService.saveImage(imageFile);
//        String imageUri = tipImageService.getImageUrl(storedFileName);
//
//        // TipImage 엔티티를 생성하고 저장합니다
//        TipImage tipImage = new TipImage();
//        tipImage.setImage(storedFileName);
//        tipImage.setTip(tip);
//        tipImageService.saveTipImage(tipImage);
//
//        // 이미지 URI를 게시글에 추가합니다
//
//        tipRepository.save(tip);
//    }

}
