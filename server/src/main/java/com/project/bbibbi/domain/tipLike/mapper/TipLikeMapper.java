package com.project.bbibbi.domain.tipLike.mapper;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipLike.dto.TipLikeRequestDto;
import com.project.bbibbi.domain.tipLike.dto.TipLikeResponseDto;
import com.project.bbibbi.domain.tipLike.entity.TipLike;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface TipLikeMapper {
    default TipLike tipLikeRequestDtoToTipLike(TipLikeRequestDto tipLikeRequestDto){
        if(tipLikeRequestDto == null){
            return null;
        }

        TipLike tipLike = new TipLike();

        Tip tip = new Tip();
        tip.setTipId(tipLikeRequestDto.getTipId());
        tipLike.setTip(tip);
        tipLike.setMember(Member.builder().memberId(tipLikeRequestDto.getMemberId()).build());
        tipLike.setCreatedDateTime(LocalDateTime.now());

        return tipLike;
    }

    default TipLikeResponseDto tipLikeToTipLikeResponseDto(TipLike tipLike){
        if(tipLike == null){
            return null;
        }

        TipLikeResponseDto tipLikeResponseDto = new TipLikeResponseDto();

        tipLikeResponseDto.setMemberId(tipLike.getMember().getMemberId());
        tipLikeResponseDto.setTipId(tipLike.getTip().getTipId());
        tipLikeResponseDto.setLikeYn(tipLike.getLikeYn());
        tipLikeResponseDto.setLikeCount(tipLike.getLikeCount());

        return tipLikeResponseDto;
    }
}
