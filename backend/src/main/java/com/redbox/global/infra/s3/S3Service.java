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
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void uploadFile(MultipartFile file, Category category, Long id, String fileName) {
        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(getKey(category, id, fileName))
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
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

    public String generatePresignedUrl(Category category, Long id, String fileName, String originalFilename) {
        try {
            String encodedFilename = URLEncoder.encode(originalFilename, StandardCharsets.UTF_8);

            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(10))
                    .getObjectRequest(b -> b.bucket(bucket)
                            .key(getKey(category, id, fileName))
                            .responseContentDisposition("attachment; filename=\"" + encodedFilename + "\""))
                    .build();

            return s3Presigner.presignGetObject(presignRequest)
                    .url()
                    .toString();
        } catch (Exception e) {
            throw new S3Exception("Failed to generate presigned URL", e);
        }
    }
}