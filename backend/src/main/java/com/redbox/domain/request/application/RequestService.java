package com.redbox.domain.request.application;

import com.redbox.domain.request.dto.DetailResponse;
import com.redbox.domain.request.dto.WriteRequest;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.dto.ListResponse;
import com.redbox.domain.request.entity.Like;
import com.redbox.domain.request.entity.Priority;
import com.redbox.domain.request.entity.Request;
import com.redbox.domain.request.entity.RequestStatus;
import com.redbox.domain.request.exception.RequestNotFoundException;
import com.redbox.domain.request.exception.UserNotFoundException;
import com.redbox.domain.request.repository.LikesRepository;
import com.redbox.domain.request.repository.RequestRepository;
import com.redbox.domain.user.entity.User;
import com.redbox.domain.user.repository.UserRepository;
import com.redbox.global.entity.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestService {

    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    private final RequestRepository requestRepository;
    private final LikesRepository likesRepository;
    private final UserRepository userRepository;

    // 현재 로그인한 사용자 정보 가져오기
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 인증 정보가 없거나 익명 사용자일 경우 null
        if (authentication == null || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        return user.getId();
    }

    // 페이지 처리
    public PageResponse<ListResponse> getRequests(int page, int size, RequestFilter request) {
        Pageable pageable = PageRequest.of(page -1, size, Sort.by("createdAt").descending());
        Long userId = getCurrentUserId();

        Page<Request> boardPage = requestRepository.searchBoards(userId, request, pageable);
        Page<ListResponse> responsePage = boardPage.map(ListResponse::new);
        return new PageResponse<>(responsePage);
    }

    // 게시글 등록
    @Transactional
    public DetailResponse createRequest(WriteRequest writeRequest, MultipartFile file) {
        String filePath = null;
        if (file != null && !file.isEmpty()) {
            filePath = saveFile(file);
        }

        // 빌더 패턴을 사용하여 Request 객체 생성
        Request request = Request.builder()
                .userId(getCurrentUserId())
                //.userId(1L) // user_id (현재 임의 값 설정)
                .requestTitle(writeRequest.getRequestTitle())
                .requestContent(writeRequest.getRequestContent())
                .targetAmount(writeRequest.getTargetAmount())
                .currentAmount(0) // 초기값
                .requestStatus(RequestStatus.REQUEST)
                .progress(RequestStatus.REQUEST)
                .donationStartDate(writeRequest.getDonationStartDate())
                .donationEndDate(writeRequest.getDonationEndDate())
                .requestAttachFile(filePath) // 저장된 파일 경로
                .priority(Priority.MEDIUM) // 초기 중요도
                .requestHits(0) // 초기 조회수
                .requestLikes(0) // 초기 좋아요 수
                .fileDownloads(0) // 초기 다운로드 수
                .build();

        requestRepository.save(request);
        return viewRequest(request.getRequestId());
    }

    // 게시글 상세조회
    @Transactional
    public DetailResponse viewRequest(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

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

        //Long userId = getCurrentUserId();
        Long userId = 1L; // 임의값 설정

        // 좋아요 여부 조회
        boolean isLiked = likesRepository.findByUserIdAndRequestId(userId, requestId)
                .map(Like::isLiked)
                .orElse(false);

        return new DetailResponse(
                request.getRequestId(),
                request.getRequestTitle(),
                request.getRequestHits(),
                request.getDonationStartDate(),
                request.getDonationEndDate(),
                request.getTargetAmount(),
                request.getCurrentAmount(),
                request.getRequestLikes(),
                request.getRequestStatus().getText(),
                request.getRequestContent(),
                isLiked,
                attachments
        );
    }

    // 게시글 상세조회 - 조회수 증가
    @Transactional
    public DetailResponse getRequestDetails(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

        request.setRequestHits(request.getRequestHits() + 1);
        requestRepository.save(request);

        return viewRequest(request.getRequestId());
    }

    // 좋아요 상태 변경
    @Transactional
    public void likeRequest(Long requestId) {

        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);

        //Long userId = getCurrentUserId();
        Long userId = 1L;

        // 좋아요 로직
        Optional<Like> optionalLike = likesRepository.findByUserIdAndRequestId(userId, requestId);

        if (optionalLike.isPresent()) {
            // 존재하면 isLiked 상태 변경
            Like like = optionalLike.get();
            if(like.isLiked()) {
                like.setLiked(false);
                request.setRequestLikes(request.getRequestLikes() - 1);
            } else {
                like.setLiked(true);
                request.setRequestLikes(request.getRequestLikes() + 1);
            }
            likesRepository.save(like);
        } else {
            // 존재하지 않으면 새로운 Like 엔티티 생성
            Like newLike = Like.builder()
                    .userId(userId)
                    .requestId(requestId)
                    .isLiked(true)
                    .build();
            request.setRequestLikes(request.getRequestLikes() + 1);
            likesRepository.save(newLike);
        }
        requestRepository.save(request);
    }

    // 게시글 수정 권한
    public Boolean modifyRequestAuthor(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(RequestNotFoundException::new);
        Long currentUserId = getCurrentUserId();
        System.out.println(request.getRequestId());
        System.out.println(currentUserId);
        return request.getRequestId().equals(currentUserId);
    }

    // 게시글 수정
    @Transactional
    public DetailResponse modifyRequest(Long requestId, WriteRequest writeRequest, MultipartFile file) {
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
        return viewRequest(modifyRequest.getRequestId());
    }

    // 파일 저장 로직
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
