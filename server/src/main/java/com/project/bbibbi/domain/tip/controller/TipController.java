package com.project.bbibbi.domain.tip.controller;

import com.project.bbibbi.domain.tip.dto.TipPatchDto;
import com.project.bbibbi.domain.tip.dto.TipPostDto;
import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tip.mapper.TipMapper;
import com.project.bbibbi.domain.tip.service.TipService;
import com.project.bbibbi.domain.tipImage.service.TipImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tip")
public class TipController {
    private final TipService tipService;

    private final TipImageService tipImageService;

    private final TipMapper tipMapper;

    public TipController(TipService tipService, TipMapper tipMapper, TipImageService tipImageService) {
        this.tipService = tipService;
        this.tipMapper = tipMapper;
        this.tipImageService = tipImageService;
    }

    @PostMapping
    public ResponseEntity<TipResponseDto> createTip(@RequestBody @Valid TipPostDto tipPostDto) {

        // 로그인한 사용자 memberId가 1 이라고 가정
        tipPostDto.setMemberId(1L);
        Tip tip = tipMapper.tipPostDtoToTip(tipPostDto);
        Tip createdTip = tipService.createTip(tip);
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(createdTip);
        return ResponseEntity.created(URI.create("/tip/" + createdTip.getTipId())).body(tipResponseDto);
    }

    @PatchMapping("/{tipId}")
    public ResponseEntity<TipResponseDto> updateTip(@PathVariable Long tipId, @RequestBody @Valid TipPatchDto tipPatchDto) {

        // 로그인한 사용자 memberId가 1 이라고 가정
        tipPatchDto.setMemberId(1L);

        Tip tip = tipMapper.tipPatchDtoToTip(tipPatchDto);
        Tip updatedTip = tipService.updateTip(tipId, tip);
        if (updatedTip == null) {
            System.out.println("null!");
//            throw new TipNotFoundException();
        }
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(updatedTip);
        return ResponseEntity.ok(tipResponseDto);
    }
    @GetMapping("/{tipId}")
    public ResponseEntity<TipResponseDto> getTip(@PathVariable Long tipId) {
        Tip tip = tipService.getTipById(tipId);
        if (tip == null) {
            System.out.println("null!");

//            throw new TipNotFoundException();
        }
        TipResponseDto tipResponseDto = tipMapper.tipToTipResponseDto(tip);
        return ResponseEntity.ok(tipResponseDto);
    }


    @DeleteMapping("/{tipId}")
    public ResponseEntity<Void> deleteTip(@PathVariable Long tipId) {
        tipService.deleteTip(tipId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TipResponseDto>> getAllTips() {
        List<Tip> tips = tipService.getAllTips();
        List<TipResponseDto> tipResponseDtos = tips.stream()
                .map(tipMapper::tipToTipResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tipResponseDtos);
    }

//    @PostMapping("/{tipId}/images")
//    public ResponseEntity<String> addTipImage(@PathVariable Long tipId, @RequestParam("image") MultipartFile imageFile) {
//        try {
//            tipService.addImageToTip(tipId, imageFile);
//            return ResponseEntity.ok("Image added successfully");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }

}
