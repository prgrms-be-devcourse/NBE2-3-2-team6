package com.redbox.domain.attach.service;

import com.redbox.domain.attach.dto.AttachFileResponse;
import com.redbox.domain.attach.entity.AttachFile;
import com.redbox.domain.attach.entity.Category;
import com.redbox.domain.attach.exception.AttachFileNotFoundException;
import com.redbox.domain.attach.exception.FileNotBelongException;
import com.redbox.domain.attach.repository.AttachFileRepository;
import com.redbox.domain.attach.strategy.FileAttachStrategy;
import com.redbox.domain.attach.strategy.FileAttachStrategyFactory;
import com.redbox.domain.notice.repository.NoticeRepository;
import com.redbox.global.infra.s3.S3Service;
import com.redbox.global.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AttachFileService {

    private final AttachFileRepository attachFileRepository;
    private final S3Service s3Service;
    private final NoticeRepository noticeRepository;
    private final FileAttachStrategyFactory fileAttachStrategyFactory;

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

    @Transactional
    public AttachFileResponse addFile(Category category, Long postId, MultipartFile file) {
        // S3에 파일 업로드
        String newFilename = FileUtils.generateNewFilename();
        String extension = FileUtils.getExtension(file);
        String fullFilename = newFilename + "." + extension;
        s3Service.uploadFile(file, category, postId, fullFilename);

        // 카테고리에 맞는 전략 사용
        FileAttachStrategy strategy = fileAttachStrategyFactory.getStrategy(category);
        AttachFile attachFile = strategy.attach(postId, file.getOriginalFilename(), fullFilename);
        attachFileRepository.save(attachFile);

        return new AttachFileResponse(attachFile);
    }

    @Transactional
    public void removeFile(Category category, Long postId, Long fileId) {
        AttachFile attachFile = attachFileRepository.findById(fileId)
                .orElseThrow(AttachFileNotFoundException::new);

        validateFileOwnership(attachFile, postId);

        s3Service.deleteFile(category, postId, attachFile.getNewFilename());

        attachFileRepository.delete(attachFile);
    }
}
