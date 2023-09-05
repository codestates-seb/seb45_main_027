package com.project.bbibbi.domain.tipImage.service;

import com.project.bbibbi.domain.tipImage.entity.TipImage;
import com.project.bbibbi.domain.tipImage.repository.TipImageRepository;
//import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Transactional
public class TipImageService {
    private final TipImageRepository tipImageRepository;
    private final String baseImageUrl = "D:/archive"; // 서버의 기본 이미지 URL을 설정합니다

    public TipImageService(TipImageRepository tipImageRepository) {
        this.tipImageRepository = tipImageRepository;
    }

    public void saveTipImage(TipImage tipImage) {
        tipImageRepository.save(tipImage);
    }



//    public String saveImage(MultipartFile imageFile) {
//        try {
//            String storedFileName = UUID.randomUUID().toString(); // 파일명은 랜덤으로 생성하거나 다른 유니크한 방식으로 설정할 수 있습니다.
//            String fileExtension = FilenameUtils.getExtension(imageFile.getOriginalFilename());
//            String storagePath = baseImageUrl + storedFileName + "." + fileExtension; // 저장될 경로를 설정합니다
//
//            // 이미지를 서버에 저장합니다
//            Files.copy(imageFile.getInputStream(), Paths.get(storagePath), StandardCopyOption.REPLACE_EXISTING);
//
//            return storedFileName;
//        } catch (IOException e) {
//            // 저장 중에 에러가 발생한 경우 예외 처리를 합니다
//            throw new RuntimeException("Failed to save image", e);
//        }
//    }

    public String getImageUrl(String storedFileName) {
        return baseImageUrl + "/" + storedFileName; // 기본 이미지 URL과 저장된 파일명을 조합하여 이미지의 접근 가능한 URI를 생성합니다
    }

    public void deleteTipImageById(Long tipImageId) {
        tipImageRepository.deleteById(tipImageId);
    }
}
