package com.project.bbibbi.domain.tipBookmark.controller;

import com.project.bbibbi.domain.tipBookmark.dto.TipBookmarkRequestDto;
import com.project.bbibbi.domain.tipBookmark.dto.TipBookmarkResponseDto;
import com.project.bbibbi.domain.tipBookmark.entity.TipBookmark;
import com.project.bbibbi.domain.tipBookmark.mapper.TipBookmarkMapper;
import com.project.bbibbi.domain.tipBookmark.service.TipBookmarkService;
import com.project.bbibbi.global.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tip/{tipId}/tipbookmark")
@Validated
public class TipBookmarkController {

    private final static String TIP_BOOKMARK_DEFAULT_URL = "/tipbookmark";

    private final TipBookmarkService tipBookmarkService;

    private final TipBookmarkMapper mapper;

    public TipBookmarkController(TipBookmarkService tipBookmarkService, TipBookmarkMapper mapper) {
        this.tipBookmarkService = tipBookmarkService;
        this.mapper = mapper;
    }

    @PatchMapping
    public ResponseEntity patchTipBookmark(@PathVariable("tipId") Long tipId){

        // 로그인한 사용자의 member_id가 1L 이라고 가정.
        // 로그인 기능 지원시 아래 코드는 삭제하고 현재 로그인한 사용자를 가져오도록 대체

        TipBookmarkRequestDto requestBody = new TipBookmarkRequestDto();

        requestBody.setMemberId(1L);
        requestBody.setTipId(tipId);

        TipBookmark tipBookmark = mapper.tipBookmarkRequestDtoToTipBookmark(requestBody);

        TipBookmark updatedTipBookmark = tipBookmarkService.settingTipBookmark(tipBookmark);

        TipBookmarkResponseDto tipBookmarkResponseDto = mapper.tipBookmarkToTipBookmarkResponseDto(updatedTipBookmark);

        return new ResponseEntity<>(new SingleResponseDto<>(tipBookmarkResponseDto), HttpStatus.OK);
    }
}
