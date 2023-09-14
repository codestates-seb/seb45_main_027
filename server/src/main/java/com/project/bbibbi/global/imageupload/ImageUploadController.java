package com.project.bbibbi.global.imageupload;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/imageUpload")
public class ImageUploadController {

    @Autowired
    private S3Uploader s3Uploader;

    private static final long MAX_FILE_SIZE = 10 * 1024 *1024; // 10MB


    @PostMapping(value = "/coverImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadCoverImage(HttpServletRequest request,
                                                @RequestParam("coverPhotoImage") MultipartFile coverPhotoImage) throws IOException {

        if (coverPhotoImage.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("10MB 이하 파일을 업로드하세요.");
        }

        String uploadImagePath = s3Uploader.upload(coverPhotoImage,"archive");

        Gson gson = new Gson();

        String response = gson.toJson(uploadImagePath);

        return ResponseEntity.ok(response);

    }

    @PostMapping(value = "/feedImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFeedImage(HttpServletRequest request,
                                                   @RequestParam("feedImage") MultipartFile feedImage) throws IOException {

        if (feedImage.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("10MB 이하 파일을 업로드하세요.");
        }

        String uploadImagePath = s3Uploader.upload(feedImage,"archive");

        Gson gson = new Gson();

        String response = gson.toJson(uploadImagePath);

        return ResponseEntity.ok(response);

    }

    @PostMapping(value = "/tipImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadTipImage(HttpServletRequest request,
                                                  @RequestParam("tipImage") MultipartFile tipImage) throws IOException {

        if (tipImage.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("10MB 이하 파일을 업로드하세요.");
        }

        String uploadImagePath = s3Uploader.upload(tipImage,"archive");

        Gson gson = new Gson();

        String response = gson.toJson(uploadImagePath);

        return ResponseEntity.ok(response);

    }

    @PostMapping(value = "/myInfoImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadMyInfoImage(HttpServletRequest request,
                                                 @RequestParam("myInfoImage") MultipartFile myInfoImage) throws IOException {

        if (myInfoImage.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("10MB 이하 파일을 업로드하세요.");
        }

        String uploadImagePath = s3Uploader.upload(myInfoImage,"archive");

        Gson gson = new Gson();

        String response = gson.toJson(uploadImagePath);

        return ResponseEntity.ok(response);

    }
}
