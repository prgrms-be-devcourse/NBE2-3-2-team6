package com.redbox.domain.request.service;

import com.redbox.domain.request.dto.DetailResponse;
import com.redbox.domain.request.dto.WriteRequest;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.dto.RequestResponse;
import com.redbox.domain.request.entity.Likes;
import com.redbox.domain.request.entity.Priority;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.Status;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.redbox.domain.request.entity.QRequest.request;

@Service
@RequiredArgsConstructor
public class RequestService {

    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    private final RequestRepository requestRepository;
    private final LikesRepository likesRepository;

    public PageResponse<RequestResponse> getRequests(int page, int size, RequestFilter request) {
        Pageable pageable = PageRequest.of(page -1, size, Sort.by("createdAt").descending());
        // 동적쿼리로 처리하기
        Page<Request> boardPage = requestRepository.findAll(pageable);
        Page<RequestResponse> responsePage = boardPage.map(RequestResponse::new);
        return new PageResponse<>(responsePage);
    }

    @Transactional
    public void saveRequest(WriteRequest writeRequest, MultipartFile file) {
        String filePath = null;
        if (file != null && !file.isEmpty()) {
            filePath = saveFile(file);
        }

        Request request = new Request(
                null, // ID 자동 생성
                1L, // user_id, 등록자 (임의 값)
                writeRequest.getRequest_title(),
                writeRequest.getRequest_content(),
                writeRequest.getTarget_amount(),
                0, // current_amount 초기값
                Status.REQUEST,
                writeRequest.getDonation_start_date(),
                writeRequest.getDonation_end_date(),
                filePath,
                Priority.MEDIUM,
                0, // 조회수 초기값
                0, // 좋아요 초기값
                0 // 파일 다운로드 초기값
        );

        requestRepository.save(request);
    }

    @Transactional
    public DetailResponse getRequestDetails(Long requestId, boolean incrementHits) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));

        // 조회수 증가(modify 에서는 조회수 증가하면 안됨)
        if(incrementHits) {
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
        Likes likes = likesRepository.findById(requestId).orElse(null);

        if (likes == null) {
            Likes like = new Likes();
            like.setRequestId(requestId);
            like.setUserId(1L); // 임의값 넣음
            like.setLiked(true);
            likesRepository.save(like);
        } else {
            likes.setLiked(!likes.isLiked());
        }
    }

    @Transactional
    public void modifyRequest(Long requestId, WriteRequest writeRequest, MultipartFile file) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));

        request.setRequestTitle(writeRequest.getRequest_title());
        request.setRequestContent(writeRequest.getRequest_content());
        request.setDonationStartDate(writeRequest.getDonation_start_date());
        request.setDonationEndDate(writeRequest.getDonation_end_date());
        request.setTargetAmount(writeRequest.getTarget_amount());

        if (file != null && !file.isEmpty()) {
            String filePath = saveFile(file);
            request.setRequestAttachFile(filePath);
        }

        requestRepository.save(request);
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
