package com.project.bbibbi.domain.tip.mapper;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.dto.TipPatchDto;
import com.project.bbibbi.domain.tip.dto.TipPostDto;
import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipImage.dto.TipImageDto;
import com.project.bbibbi.domain.tipImage.entity.TipImage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TipMapper {
    TipMapper INSTANCE = Mappers.getMapper(TipMapper.class);

//    Tip tipPostDtoToTip(TipPostDto tipPostDto);
//
//    Tip tipPatchDtoToTip(TipPatchDto tipPatchDto);
//
//    TipResponseDto tipToTipResponseDto(Tip tip);
//
//    List<TipResponseDto> mapToResponseDtoList(List<Tip> tips);

    default Tip tipPostDtoToTip(TipPostDto tipPostDto){
        if(tipPostDto == null){
            return null;
        }

        Tip tip = new Tip();

        tip.setTitle(tipPostDto.getTitle());
        tip.setCoverPhoto(tipPostDto.getCoverPhoto());
        tip.setContent(tipPostDto.getContent());
        tip.setMember(Member.builder().memberId(tipPostDto.getMemberId()).build());

        List<TipImage> tipImages = new ArrayList<>();

        for(TipImageDto tipImageDto : tipPostDto.getTipImages()){
            TipImage tipImage = new TipImage();

            tipImage.setImage(tipImageDto.getImage());
            tipImage.setTip(tip);
            tipImage.setCreatedDateTime(LocalDateTime.now());

            tipImages.add(tipImage);
        }

        tip.setTipImages(tipImages);

        tip.setCreatedDateTime(LocalDateTime.now());

        return tip;

    }

    default Tip tipPatchDtoToTip(TipPatchDto tipPatchDto){
        if(tipPatchDto == null) return null;

        Tip tip = new Tip();

        tip.setTitle(tipPatchDto.getTitle());
        tip.setCoverPhoto(tipPatchDto.getCoverPhoto());
        tip.setContent(tipPatchDto.getContent());
        tip.setMember(Member.builder().memberId(tipPatchDto.getMemberId()).build());

        List<TipImage> tipImages = new ArrayList<>();

        for(TipImageDto tipImageDto : tipPatchDto.getTipImages()){
            TipImage tipImage = new TipImage();

            tipImage.setImage(tipImageDto.getImage());
            tipImage.setTip(tip);
            tipImage.setCreatedDateTime(LocalDateTime.now());
            tipImage.setModifiedDateTime(LocalDateTime.now());

            tipImages.add(tipImage);
        }

        tip.setTipImages(tipImages);

        tip.setModifiedDateTime(LocalDateTime.now());

        return tip;
    }

    default TipResponseDto tipToTipResponseDto(Tip tip){
        if(tip == null){
            return null;
        }

        TipResponseDto tipResponseDto = new TipResponseDto();

        tipResponseDto.setTipId(tip.getTipId());
        tipResponseDto.setTitle(tip.getTitle());
        tipResponseDto.setCoverPhoto(tip.getCoverPhoto());
        tipResponseDto.setContent(tip.getContent());
        tipResponseDto.setViews(tip.getViews());
        tipResponseDto.setMemberId(tip.getMember().getMemberId());
        tipResponseDto.setNickname(tip.getMember().getNickname());

        List<TipImageDto> tipImageDtos = new ArrayList<>();

        for(TipImage tipImage : tip.getTipImages()){
            TipImageDto tipImageDto = new TipImageDto(tipImage.getTipImageId()
                    ,tipImage.getImage()
                    ,tipImage.getTip().getTipId()
                    ,tipImage.getCreatedDateTime()
                    ,tipImage.getModifiedDateTime());

            tipImageDtos.add(tipImageDto);
        }

        tipResponseDto.setTipImages(tipImageDtos);

        tipResponseDto.setCreatedDateTime(tip.getCreatedDateTime());
        tipResponseDto.setModifiedDateTime(tip.getModifiedDateTime());

        return tipResponseDto;

    }

}
