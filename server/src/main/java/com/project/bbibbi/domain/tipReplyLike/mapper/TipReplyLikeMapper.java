package com.project.bbibbi.domain.tipReplyLike.mapper;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReplyLike.dto.TipReplyLikeRequestDto;
import com.project.bbibbi.domain.tipReplyLike.dto.TipReplyLikeResponseDto;
import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface TipReplyLikeMapper {
    default TipReplyLike tipReplyLikeRequestDtoToTipReplyLike(TipReplyLikeRequestDto tipReplyLikeRequestDto){
        if(tipReplyLikeRequestDto == null){
            return null;
        }

        TipReplyLike tipReplyLike = new TipReplyLike();

        TipReply tipReply = new TipReply();
        tipReply.setTipReplyId(tipReplyLikeRequestDto.getTipReplyId());
        tipReplyLike.setTipReply(tipReply);
        tipReplyLike.setMember(Member.builder().memberId(tipReplyLikeRequestDto.getMemberId()).build());
        tipReplyLike.setCreatedDateTime(LocalDateTime.now());

        return tipReplyLike;
    }

    default TipReplyLikeResponseDto tipReplyLikeToTipReplyLikeResponseDto(TipReplyLike tipReplyLike){
        if(tipReplyLike == null){
            return null;
        }

        TipReplyLikeResponseDto tipReplyLikeResponseDto = new TipReplyLikeResponseDto();

        tipReplyLikeResponseDto.setMemberId(tipReplyLike.getMember().getMemberId());
        tipReplyLikeResponseDto.setTipReplyId(tipReplyLike.getTipReply().getTipReplyId());
        tipReplyLikeResponseDto.setLikeYn(tipReplyLike.getLikeYn());
        tipReplyLikeResponseDto.setLikeCount(tipReplyLike.getLikeCount());

        return tipReplyLikeResponseDto;
    }
}
