package com.redbox.domain.attach.service;

import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.attach.exception.AttachFileNotFoundException;
import com.redbox.domain.attach.exception.FileNotBelongException;
import com.redbox.domain.attach.repository.AttachFileRepository;
import com.redbox.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttachFileService {

    private final AttachFileRepository attachFileRepository;
    private final S3Service s3Service;

    public String getFileDownloadUrl(Long postId, Long fileId) {
        AttachFile attachFile = attachFileRepository.findById(fileId)
                .orElseThrow(AttachFileNotFoundException::new);

        validateFileOwnership(attachFile, postId);

        // PreSignedURL 생성
        return s3Service.generatePresignedUrl(
                attachFile.getCategory(),
                postId,
                attachFile.getNewFilename(),
                attachFile.getOriginalFilename()
        );
    }

    private void validateFileOwnership(AttachFile attachFile, Long postId) {
        boolean isValid = switch (attachFile.getCategory()) {
            case NOTICE -> attachFile.getNotice() != null &&
                    attachFile.getNotice().getId().equals(postId);
            // Request 기능과 합쳐지면 수정
            case REQUEST -> true;
//                    attachFile.getRequest() != null &&
//                    attachFile.getRequest().getId().equals(postId);
        };

        if (!isValid) {
            throw new FileNotBelongException();
        }
    }
}
