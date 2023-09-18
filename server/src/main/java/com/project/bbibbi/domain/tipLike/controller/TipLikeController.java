package com.project.bbibbi.domain.tipLike.controller;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.tipLike.dto.TipLikeRequestDto;
import com.project.bbibbi.domain.tipLike.dto.TipLikeResponseDto;
import com.project.bbibbi.domain.tipLike.entity.TipLike;
import com.project.bbibbi.domain.tipLike.mapper.TipLikeMapper;
import com.project.bbibbi.domain.tipLike.service.TipLikeService;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tip/{tip-id}/tiplike")
@Validated
public class TipLikeController {

    private final static String TIP_LIKE_DEFAULT_URL = "/tipLike";

    private final TipLikeService tipLikeService;

    private final TipLikeMapper mapper;

    public TipLikeController(TipLikeService tipLikeService, TipLikeMapper mapper) {
        this.tipLikeService = tipLikeService;
        this.mapper = mapper;
    }

    @PatchMapping
    public ResponseEntity patchTipLike(@PathVariable("tip-id") Long tipId){

        // 로그인한 사용자의 member_id가 1L 이라고 가정.
        // 로그인 기능 지원시 아래 코드는 삭제하고 현재 로그인한 사용자를 가져오도록 대체

        TipLikeRequestDto requestBody = new TipLikeRequestDto();

        requestBody.setMemberId(loginUtils.getLoginId());
        requestBody.setTipId(tipId);

        TipLike tipLike = mapper.tipLikeRequestDtoToTipLike(requestBody);

        TipLike updatedTipLike = tipLikeService.settingTipLike(tipLike);

        TipLikeResponseDto tipLikeResponseDto = mapper.tipLikeToTipLikeResponseDto(updatedTipLike);

        return new ResponseEntity<>(new SingleResponseDto<>(tipLikeResponseDto), HttpStatus.OK);
    }
}
