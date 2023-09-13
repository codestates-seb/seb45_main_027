package com.project.bbibbi.domain.tip.controller;

import com.project.bbibbi.domain.tip.dto.TipPatchDto;
import com.project.bbibbi.domain.tip.dto.TipPostDto;
import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tip.mapper.TipMapper;
import com.project.bbibbi.domain.tip.service.TipService;
//import com.project.bbibbi.domain.tipImage.service.TipImageService;
//import com.project.bbibbi.domain.tipTag.entity.TipTag;
//import com.project.bbibbi.domain.tipTag.repository.TipTagRepository;
//import com.project.bbibbi.domain.tipTag.service.TagService;
//import com.project.bbibbi.domain.tipTag.service.TipTagService;
import com.project.bbibbi.global.exception.tipexception.TipNotFoundException;
import com.project.bbibbi.global.response.MultiResponseDto;
import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping("/tip")
public class TipController {

    private final static String TIP_DEFAULT_URL = "/tip";

    private final TipService tipService;

//    private final TipImageService tipImageService;

//    private final TipTagService tipTagService;

    private final TipMapper tipMapper;

    public TipController(TipService tipService, TipMapper tipMapper) {
        this.tipService = tipService;
        this.tipMapper = tipMapper;
//        this.tipTagService = tipTagService;
//        this.tipImageService = tipImageService;
    }

    @PostMapping
    public ResponseEntity<TipResponseDto> createTip(@RequestBody @Valid TipPostDto tipPostDto) {

        // 로그인한 사용자 memberId가 1 이라고 가정
        tipPostDto.setMemberId(1L);
        Tip tip = tipMapper.tipPostDtoToTip(tipPostDto);
        Tip createdTip = tipService.createTip(tip);
//        tipTagService.saveTags(createdTip, tipPostDto.tagContents());
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(createdTip);
        return ResponseEntity.created(URI.create("/tip/" + createdTip.getTipId())).body(tipResponseDto);
    }

    @PatchMapping("/{tip-id}")
    public ResponseEntity<TipResponseDto> updateTip(
            @PathVariable("tip-id") Long tipId, @RequestBody @Valid TipPatchDto tipPatchDto) {

        // 로그인한 사용자 memberId가 1 이라고 가정
        tipPatchDto.setMemberId(1L);

        Tip tip = tipMapper.tipPatchDtoToTip(tipPatchDto);
        Tip updatedTip = tipService.updateTip(tipId, tip);
        if (updatedTip == null) {
//            System.out.println("null!");
            throw new TipNotFoundException();
        }
//        tipTagService.saveTags(updatedTip, tipPatchDto.tagContents());
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(updatedTip);
        return ResponseEntity.ok(tipResponseDto);
    }
    @GetMapping("/{tip-id}")
    public ResponseEntity<TipResponseDto> getTip(@PathVariable("tip-id") Long tipId) {
        Tip tip = tipService.getTip(tipId);
//        List<TipTag> tipTags = tipTagService.findTagListByTip(tipService.findVerifiedTip(tipId));
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(tip);
//        tipResponseDto.setTiptags(tipTags); // tiptags를 TipResponseDto에 설정
        return ResponseEntity.ok(tipResponseDto);
    }

    @DeleteMapping("/{tip-id}")
    public ResponseEntity<Void> deleteTip(@PathVariable Long tipId) {
        tipService.deleteTip(tipId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/myInfoSearch")
    public ResponseEntity getMyInfoTips(@RequestParam int page) {

        // myInfo 대상 memberId가 1번이라고 가정한다. 로그인 기능 구현되면 아랫줄 대신 로그인대상을 받는 코드를 쓴다.
        Long myInfoMemberId = 1L;

        // 사이즈는 4로 고정
        int size = 4;

        List<Tip> pageTips = tipService.findMyInfoTips(myInfoMemberId);  // 비쿼리일 경우

//        List<Tip> tips = tipService.findMyInfoTips(page - 1, size, myInfoMemberId); 쿼리방법
        List<TipResponseDto> tipResponseDtos = pageTips.stream()
                .map(tipMapper::tipToTipResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResponseDto<>(tipResponseDtos), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<TipResponseDto>> getAllTips(@RequestParam int page) {

        // 사이즈는 12로 고정
        int size = 12;

        Page<Tip> pageTips = tipService.getAllTips(page - 1, size);

        List<Tip> tips = pageTips.getContent();

        List<TipResponseDto> tipResponseDtos = tips.stream()
                .map(tipMapper::tipToTipResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tipResponseDtos);
    }

//    @GetMapping
//    public ResponseEntity<Slice<Tip>> getAllTips(
//            @RequestParam(value = "searchString", required = false) String searchString,
//            @PageableDefault(size=12) Pageable pageable) {
//        return new ResponseEntity<>(
//                tipService.findTipAllByCreatedAtDesc(searchString, pageable), HttpStatus.OK);
//    }

    @GetMapping("/search/{search-string}")
    public ResponseEntity<List<TipResponseDto>> getAllSearchTips(@PathVariable("search-string") String searchString,
                                                                 @RequestParam int page) {

        // 사이즈는 12로 고정
        int size = 12;


        List<Tip> pageTips = tipService.getAllSearchTips(searchString, page - 1, size);


        List<TipResponseDto> tipResponseDtos = pageTips.stream()
                .map(tipMapper::tipToTipResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tipResponseDtos);
    }

//    @GetMapping("/search/{search-string}")
//    public ResponseEntity<Slice<Tip>> searchAllTips(@PathVariable("search-string") String searchString,
//                                                    @RequestParam @PageableDefault(size=12) Pageable pageable) {
//        return new ResponseEntity<>(
//                tipService.findTipAllByCreatedAtDesc(searchString, pageable), HttpStatus.OK);
//    }
}
