package com.redbox.domain.request.service;

import com.redbox.domain.request.dto.DetailResponse;
import com.redbox.domain.request.dto.WriteRequest;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.dto.ListResponse;
import com.redbox.domain.request.entity.Like;
import com.redbox.domain.request.entity.Priority;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.Status;
import com.redbox.domain.request.exception.RequestNotFoundException;
import com.redbox.domain.request.repository.LikesRepository;
import com.redbox.domain.request.repository.RequestRepository;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    private final RequestRepository requestRepository;
    private final LikesRepository likesRepository;

    public PageResponse<ListResponse> getRequests(int page, int size, RequestFilter request) {
        Pageable pageable = PageRequest.of(page -1, size, Sort.by("createdAt").descending());
        // 동적쿼리로 처리하기
        Page<Request> boardPage = requestRepository.findAll(pageable);
        Page<ListResponse> responsePage = boardPage.map(ListResponse::new);
        return new PageResponse<>(responsePage);
    }

    @Transactional
    public Long createRequest(WriteRequest writeRequest, MultipartFile file) {
        String filePath = null;
        if (file != null && !file.isEmpty()) {
            filePath = saveFile(file);
        }

        // 빌더 패턴을 사용하여 Request 객체 생성
        Request request = Request.builder()
                .userId(1L) // user_id (현재 임의 값 설정)
                .requestTitle(writeRequest.getRequestTitle())
                .requestContent(writeRequest.getRequestContent())
                .targetAmount(writeRequest.getTargetAmount())
                .currentAmount(0) // 초기값
                .status(Status.REQUEST)
                .donationStartDate(writeRequest.getDonationStartDate())
                .donationEndDate(writeRequest.getDonationEndDate())
                .requestAttachFile(filePath) // 저장된 파일 경로
                .priority(Priority.MEDIUM) // 초기 중요도
                .requestHits(0) // 초기 조회수
                .requestLikes(0) // 초기 좋아요 수
                .fileDownloads(0) // 초기 다운로드 수
                .build();

        Request savedRequest = requestRepository.save(request);
        return savedRequest.getRequestId();
    }

    @Transactional
    public DetailResponse getRequestDetails(Long requestId, boolean isIncrement) {
        // todo: 게시판 err 처리
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

        // 조회수 증가(modify 에서는 조회수 증가하면 안됨)
        if(isIncrement) {
            request.setRequestHits(request.getRequestHits() + 1);
            requestRepository.save(request);
        }

        List<DetailResponse.AttachmentResponse> attachments = new ArrayList<>();
        if (request.getRequestAttachFile() != null) {
            String fullFileName = new File(request.getRequestAttachFile()).getName();
            String fileName = fullFileName.substring(fullFileName.indexOf("_") + 1);
            attachments.add(new DetailResponse.AttachmentResponse(
                    fileName,
                    request.getFileDownloads(),
                    "/community/request/download/" + fileName
            ));
        }

        return new DetailResponse(
                request.getRequestId(),
                request.getRequestTitle(),
                request.getRequestHits(),
                request.getDonationStartDate(),
                request.getDonationEndDate(),
                request.getTargetAmount(),
                request.getCurrentAmount(),
                request.getRequestLikes(),
                request.getStatus().getText(),
                request.getRequestContent(),
                false,
                attachments
        );
    }

    // 좋아요 상태 변경
    @Transactional
    public void likeRequest(Long requestId) {

        // userId, requestId 없으면 추가, 있으면 상태 변경
        // todo : userId 추가
        // user_id, request_id 에 해당하는 DetailResponse 에서의 isLiked 도 수정
        Like likes = likesRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

        if (likes == null) {
            Like like = new Like();
            like.setRequestId(requestId);
            like.setUserId(1L); // 임의값 넣음
            like.setLiked(true);
            likesRepository.save(like);
        } else {
            likes.setLiked(!likes.isLiked());
        }
    }

    @Transactional
    public Long modifyRequest(Long requestId, WriteRequest writeRequest, MultipartFile file) {
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

        request.setRequestTitle(writeRequest.getRequestTitle());
        request.setRequestContent(writeRequest.getRequestContent());
        request.setDonationStartDate(writeRequest.getDonationStartDate());
        request.setDonationEndDate(writeRequest.getDonationEndDate());
        request.setTargetAmount(writeRequest.getTargetAmount());

        if (file != null && !file.isEmpty()) {
            String filePath = saveFile(file);
            request.setRequestAttachFile(filePath);
        }

        Request modifyRequest = requestRepository.save(request);
        return modifyRequest.getRequestId();
    }

    private String saveFile(MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName;

            File dest = new File(filePath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            file.transferTo(dest);
            return filePath;

        } catch (IOException e) {
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
        }
    }
}
