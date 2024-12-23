package com.redbox.global.infra.s3;

import com.redbox.domain.attach.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file, Category category, Long id, String fileName) {
        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(getKey(category, id, fileName))
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return String.format("https://%s.s3.%s.amazonaws.com/%s",
                    bucket, region, getKey(category, id, fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteFile(Category category, Long id, String fileName) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(getKey(category, id, fileName))
                .build();

        s3Client.deleteObject(request);
    }

    private static String getKey(Category category, Long id, String fileName) {
        String key = "";
        if (category == Category.NOTICE) {
            key = String.format("notice/%d/%s", id, fileName);
        } else if (category == Category.REQUEST){
            key = String.format("request/%d/%s", id, fileName);
        }

        return key;
    }
}