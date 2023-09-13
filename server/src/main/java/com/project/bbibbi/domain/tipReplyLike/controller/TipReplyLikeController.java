package com.project.bbibbi.domain.tipReplyLike.controller;

import com.project.bbibbi.domain.tipReplyLike.dto.TipReplyLikeRequestDto;
import com.project.bbibbi.domain.tipReplyLike.dto.TipReplyLikeResponseDto;
import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import com.project.bbibbi.domain.tipReplyLike.mapper.TipReplyLikeMapper;
import com.project.bbibbi.domain.tipReplyLike.service.TipReplyLikeService;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tip/{tip-id2}/tipreply/{reply-id}/tipreplylike")
@Validated
public class TipReplyLikeController {

    private final static String TIP_REPLY_LIKE_DEFAULT_URL = "/tipreplylike";

    private final TipReplyLikeService tipReplyLikeService;

    private final TipReplyLikeMapper mapper;

    public TipReplyLikeController(TipReplyLikeService tipReplyLikeService, TipReplyLikeMapper mapper) {
        this.tipReplyLikeService = tipReplyLikeService;
        this.mapper = mapper;
    }

    @PatchMapping
    public ResponseEntity patchTipReplyLike(@PathVariable("tip-id2") Long tipId, @PathVariable("reply-id") Long replyId) {

        // 로그인한 사용자의 member_id가 1L 이라고 가정.
        // 로그인 기능 지원시 아래 코드는 삭제하고 현재 로그인한 사용자를 가져오도록 대체

        TipReplyLikeRequestDto requestBody = new TipReplyLikeRequestDto();

        requestBody.setMemberId(1L);
        requestBody.setTipReplyId(replyId);

        TipReplyLike tipReplyLike = mapper.tipReplyLikeRequestDtoToTipReplyLike(requestBody);

        TipReplyLike updatedTipReplyLike = tipReplyLikeService.settingTipReplyLike(tipReplyLike);

        TipReplyLikeResponseDto tipReplyLikeResponseDto = mapper.tipReplyLikeToTipReplyLikeResponseDto(updatedTipReplyLike);

        return new ResponseEntity<>(new SingleResponseDto<>(tipReplyLikeResponseDto), HttpStatus.OK);
    }
}
